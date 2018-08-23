// @flow
import { eventChannel } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeLatest,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import {
  setFriends,
  setMember,
  setMembers,
  setOrder,
  setOrders,
  setPending,
  setUsers,
} from '../Redux';
import {
  readFriends,
  readOrder,
  readUserInfo,
  removeOrderFromUser,
} from '../helpers';
import firebase from '@firebase/app';

import type {
  Id,
  Order,
  Unsynced,
  UserInformation,
  ThrowableRead,
} from 'parcley';
import { user } from '../Redux/selectors';
import { actionTypes } from '../Redux/actions';
import { meId } from '../../Onboarding/Redux/selectors';
import { toEntityMap } from '../../Utils';
import { ReadError } from '../../Utils/firebase';

export const readUserIfNecessary = function*(
  uid: Id,
  alwaysReturn?: boolean,
): Generator<*, *, *> {
  let userInfo = yield select(user, uid);
  if (userInfo) return alwaysReturn ? userInfo : null;
  userInfo = yield call(readUserInfo, uid);
  return userInfo;
};

/**
 * Orders
 */
const createJoinedOrdersChannel = (userId: Id) =>
  eventChannel(emit =>
    firebase
      .firestore()
      .collection(`users/${userId}/orders`)
      .where('joined', '==', true)
      .onSnapshot(querySnapshot => emit({ querySnapshot })),
  );
const createMembersChannel = (orderUid: Id) =>
  eventChannel(emit =>
    firebase
      .firestore()
      .collection(`orders/${orderUid}/members`)
      .orderBy('username', 'asc')
      .onSnapshot(querySnapshot => emit({ querySnapshot })),
  );

const fetchDataForOrderSaga = function*(orderId: Id) {
  let membersChannel;
  try {
    const order = yield call(readOrder, orderId);
    yield put(setOrder(order));
    membersChannel = yield call(createMembersChannel, orderId);

    while (true) {
      const { querySnapshot } = yield take(membersChannel);
      const members = querySnapshot.docs.reduce(
        (prev, doc) => ({ ...prev, [doc.id]: doc.data() }),
        {},
      );
      yield put(setMembers(orderId, members));
    }
  } catch (e) {
    console.log('error', e);
  } finally {
    membersChannel && membersChannel.close();
  }
};
const listenToOrdersSaga = function*() {
  const tasks = {};
  const myId = yield select(meId);
  const channel = yield call(createJoinedOrdersChannel, myId);
  try {
    while (true) {
      const { querySnapshot } = yield take(channel);
      console.log(querySnapshot.docs.map(doc => doc.id));
      const newTasks = yield all(
        querySnapshot.docs.map(doc => fork(fetchDataForOrderSaga, doc.id)),
      );
      newTasks.map((task, i) => (tasks[querySnapshot.docs[i].id] = task));
    }
  } catch (e) {
    console.log('error', e);
  } finally {
    channel.close();
    yield all(Object.keys(tasks).map(key => cancel(tasks[key])));
  }
};

const readOrdersSaga = function*() {
  try {
    yield put(setPending(true));
    const meUid = yield select(meId);
    const meInfo = yield call(readUserIfNecessary, meUid, true);
    const orderUids = Object.keys(meInfo.joinedOrders);

    const ordersResult: ThrowableRead<Order>[] = yield all(
      orderUids.map(uid => call(readOrder, uid)),
    );
    const failedOrders: ReadError<>[] = (ordersResult.filter(
      ReadError.isError,
    ): any[]);
    const orders: Order[] = (ordersResult.filter(ReadError.isNotError): any[]);

    yield all(
      failedOrders.map(error => call(removeOrderFromUser, meUid, error.data)),
    );

    const orderMap = toEntityMap(orders);
    yield put(setOrders(orderMap));

    const userUidMap = orders.reduce(
      (prev, order) => ({ ...prev, ...order.members }),
      {},
    );
    const userUids = Object.keys(userUidMap);
    const users = yield all(
      userUids.map(uid => call(readUserIfNecessary, uid, true)),
    );
    const userMap = toEntityMap(users);
    yield put(setUsers(userMap));
    yield put(setPending(false));
  } catch (e) {
    console.log(e);
  }
};
const readFriendsSaga = function*() {
  try {
    const myUid = yield select(meId);
    const friends = yield call(readFriends, myUid);
    yield put(setFriends(friends));
    const users = yield all(
      friends.map(friendInfo => call(readUserIfNecessary, friendInfo.uid)),
    );
    yield put(setUsers(users));
  } catch (e) {}
};

const listenForAllDataSaga = function*() {
  yield all([fork(listenToOrdersSaga)]);
};
const readAllDataSaga = function*() {
  yield all([call(readFriendsSaga), call(readOrdersSaga)]);
};

const dataSaga = function*(): Generator<*, *, *> {
  yield takeLatest([actionTypes.FETCH_ALL_DATA], listenForAllDataSaga);
};

export { dataSaga };
