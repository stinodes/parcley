// @flow
import { eventChannel, END } from 'redux-saga';
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
  setUser,
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

export const _readUserIfNecessary = function*(
  uid: Id,
  alwaysReturn?: boolean,
): Generator<*, *, *> {
  let userInfo = yield select(user, uid);
  if (userInfo) return alwaysReturn ? userInfo : null;
  userInfo = yield call(readUserInfo, uid);
  return userInfo;
};

export const fetchUserSaga = function*(userId: string): Generator<*, *, *> {
  try {
    let userInfo = yield select(user, userId);
    if (!userInfo) {
      userInfo = yield call(readUserInfo, userId);
      yield put(setUser(userInfo));
    }
    return userInfo;
  } catch (e) {
    console.log('error', userId, e);
  }
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
      .onSnapshot(querySnapshot => emit({ querySnapshot }), error => emit(END)),
  );
const createMembersChannel = (orderUid: Id) =>
  eventChannel(emit =>
    firebase
      .firestore()
      .collection(`orders/${orderUid}/members`)
      .orderBy('username', 'asc')
      .onSnapshot(querySnapshot => emit({ querySnapshot }), error => emit(END)),
  );
const createFriendsChannel = (userId: Id) =>
  eventChannel(emit =>
    firebase
      .firestore()
      .collection(`users/${userId}/friends`)
      .orderBy('rankIndex', 'desc')
      .onSnapshot(querySnapshot => emit({ querySnapshot }), error => emit(END)),
  );
const listenToMembersSaga = function*(orderId: Id) {
  const membersChannel = yield call(createMembersChannel, orderId);
  try {
    while (true) {
      const { querySnapshot } = yield take(membersChannel);
      const members = querySnapshot.docs.reduce(
        (prev, doc) => ({ ...prev, [doc.id]: doc.data() }),
        {},
      );
      yield put(setMembers(orderId, members));
      yield all(querySnapshot.docs.map(doc => call(fetchUserSaga, doc.id)));
    }
  } catch (e) {
    console.log('error', e);
  } finally {
    membersChannel.close();
  }
};
const fetchDataForOrderSaga = function*(orderId: Id) {
  let membersChannel;
  try {
    const order = yield call(readOrder, orderId);
    yield put(setOrder(order));
    yield call(listenToMembersSaga, orderId);
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
const listenToFriendsSaga = function*() {
  const myId = yield select(meId);
  const channel = yield call(createFriendsChannel, myId);
  try {
    while (true) {
      const { querySnapshot } = yield take(channel);
      const friends = querySnapshot.docs.reduce(
        (prev, doc) => ({
          ...prev,
          [doc.id]: doc.data(),
        }),
        {},
      );
      yield put(setFriends(friends));
      yield all(querySnapshot.docs.map(doc => call(fetchUserSaga, doc.id)));
    }
  } catch (e) {
    console.log('friends error', e);
  } finally {
    channel.close();
  }
};

const listenForAllDataSaga = function*() {
  yield all([fork(listenToOrdersSaga), fork(listenToFriendsSaga)]);
};

const dataSaga = function*(): Generator<*, *, *> {
  yield takeLatest([actionTypes.FETCH_ALL_DATA], listenForAllDataSaga);
};

export { dataSaga };
