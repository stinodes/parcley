// @flow
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { meInfo } from '../../../Onboarding/Redux/selectors';
import {
  addOrderToUser,
  createOrder,
  generateOrderCode,
  joinOrder,
  uidForOrderCode,
  uidForUsername,
} from '../../helpers';
import { readUserIfNecessary } from '../../Saga';

import type { Order, Unsynced, Member, Id } from 'parcley';
import { setOrder } from '../../Redux';
import { actionTypes } from '../Redux/actions';
import { setIsPending, setIsSuccessful } from '../Redux';
import { createError } from '../../../Utils/messageBar';
import { toEntityMap } from '../../../Utils';

export type CreateOrderValues = {
  name: string,
  description: string,
  members: string | string[],
  isPrivate: boolean,
};
export type JoinOrderValues = {
  code: string,
};

const createOrderSaga = function*(action) {
  try {
    yield put(setIsPending(true));

    const order = action.payload;
    const me = yield select(meInfo);

    const memberUsernameArray: string[] = !Array.isArray(order.members)
      ? order.members.split(', ').filter(username => username)
      : order.members;
    const membersWithoutMe = memberUsernameArray.filter(
      username => username !== me.username,
    );
    const membersUidArray = yield all(
      membersWithoutMe.map(username => call(uidForUsername, username)),
    );

    const filteredUidArray = membersUidArray.filter(uid => !!uid);

    console.log('getting members', filteredUidArray);
    let members = yield all(
      filteredUidArray.map(uid => call(readUserIfNecessary, uid, true)),
    );
    members = [me, ...members];
    console.log('members', members);

    const code = yield call(generateOrderCode);
    console.log('code', code);

    const orderValues: Unsynced<$Diff<Order, { members: { [Id]: Member } }>> = {
      code,
      name: order.name,
      description: order.description,
      isPrivate: false,
      host: me.uid,
      startedOn: Date.now(),
    };
    console.log('creating order', orderValues);
    const result = yield call(createOrder, orderValues);
    console.log('created order', result);
    yield all(members.map(member => call(joinOrder, result.uid, member)));
    yield put(setOrder(result));
    yield all(
      members.map(member => call(addOrderToUser, member.uid, result.uid)),
    );

    yield put(setIsSuccessful(true));
    yield put(setIsPending(false));
  } catch (e) {
    console.log(e);
    yield put(setIsSuccessful(false));
    yield put(setIsPending(false));
    yield call(createError, {
      message: e.message,
    });
  }
};

const joinOrderSaga = function*(action) {
  try {
    yield put(setIsPending(true));

    const { code } = action.payload;
    const orderUid = yield call(uidForOrderCode, code);

    if (!orderUid) throw new Error('Not an existing order');

    const userInfo = yield select(meInfo);

    const member = {
      uid: userInfo.uid,
      username: userInfo.username,
      score: null,
    };
    yield call(joinOrder, orderUid, member);
    yield call(addOrderToUser, member.uid, orderUid);

    yield put(setIsSuccessful(true));
    yield put(setIsPending(false));
  } catch (e) {
    console.log(e);
    yield put(setIsSuccessful(false));
    yield put(setIsPending(false));
    yield call(createError, {
      message: e.message,
    });
  }
};

export const newOrderSaga = function*(): Generator<*, *, *> {
  yield takeLatest([actionTypes.CREATE_ORDER], createOrderSaga);
  yield takeLatest([actionTypes.JOIN_ORDER], joinOrderSaga);
};
