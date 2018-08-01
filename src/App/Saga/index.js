// @flow
import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {setOrders, setPending, setUsers} from '../Redux'
import {readOrder, readOrders, readUserInfo} from '../helpers'

import type {Id, Order, Unsynced, UserInformation} from 'parcley'
import {user} from '../Redux/selectors'
import {actionTypes} from '../Redux/actions'
import {meId} from '../../Onboarding/Redux/selectors'
import {toEntityMap} from '../../Utils'

export const readUserIfNecessary = function* (uid: Id, returnAll?: boolean): Generator<*, *, *> {
  let userInfo = yield select(user, uid)
  if (userInfo)
    return returnAll ? userInfo : null
  userInfo = yield call(readUserInfo, uid)
  return userInfo
}
const readUsersForOrder = function* (order: Order) {
  const hostUid = order.host
  const memberUids = Object.keys(order.members)
  const users = yield all(
    memberUids
      .filter(uid => !!uid && order.members[uid])
      .map(uid => call(readUserIfNecessary, uid))
  )
  const userMap = users.filter(user => !!user).reduce((prev, user) => ({...prev, [user.uid]: user}), {})
  yield put(setUsers(userMap))
}
const readOrderData = function* () {
  try {
    yield put(setPending(true))
    const meUid = yield select(meId)
    const meInfo = yield call(readUserIfNecessary, meUid, true)
    const orderUids = Object.keys(meInfo.joinedOrders)
    
    const orders = yield all(
      orderUids.map( uid =>
        call(readOrder, uid)
      )
    )
    // TODO: remove non-existent orders from own user
    const orderMap = toEntityMap(orders)
    yield put(setOrders(orderMap))
    
    const userUidMap = orders.reduce((prev, order) => ({...prev, ...order.members}), {})
    const userUids = Object.keys(userUidMap)
    const users = yield all(
      userUids
        .map(uid =>
          call(readUserIfNecessary, uid, true)
        )
    )
    const userMap = toEntityMap(users)
    yield put(setUsers(userMap))
    yield put(setPending(false))
  }
  catch (e) {
    console.log(e)
  }
}

const dataSaga = function* (): Generator<*, *, *> {
  yield takeLatest([actionTypes.FETCH_ALL_DATA], readOrderData)
}

export {dataSaga}
