// @flow
import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {setMatches, setPending, setUsers} from '../Redux'
import {readMatches, readUserInfo} from '../helpers'

import type {Id, Match} from 'coolio'
import {user} from '../Redux/selectors'
import {actionTypes} from '../Redux/actions'

const readUserIfNecessary = function* (uid: Id) {
  let userInfo = yield select(user, uid)
  if (userInfo)
    return null
  userInfo = yield call(readUserInfo, uid)
  console.log(userInfo)
  return userInfo
}
const readUsersForMatch = function* (match: Match) {
  const hostUid = match.host.uid
  const memberUids = Object.keys(match.members)
  const uids = [hostUid, ...memberUids]
  const users = yield all(uids.map(id =>
    call(readUserIfNecessary, id))
  )
  const userMap = users.filter(user => !!user).reduce((prev, user) => ({...prev, [user.uid]: user}), {})
  yield put(setUsers(userMap))
}
const readMatchData = function* () {
  yield put(setPending(true))
  const data = yield call(readMatches)
  yield put(setMatches(data))
  yield all(
    Object.values(data)
      .map(match =>
        call(readUsersForMatch, match)
      )
  )
  yield put(setPending(false))
}

const dataSaga = function* (): Generator<*, *, *> {
  yield takeLatest([actionTypes.FETCH_ALL_DATA], readMatchData)
}

export {dataSaga}
