// @flow
import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {setMatches, setPending, setUsers} from '../Redux'
import {readMatches, readUserInfo} from '../helpers'

import type {Id, Match, Unsynced} from 'coolio'
import {user} from '../Redux/selectors'
import {actionTypes} from '../Redux/actions'

export const readUserIfNecessary = function* (uid: Id, returnAll?: boolean): Generator<*, *, *> {
  let userInfo = yield select(user, uid)
  if (userInfo)
    return returnAll ? userInfo : null
  userInfo = yield call(readUserInfo, uid)
  return userInfo
}
const readUsersForMatch = function* (match: Match) {
  const hostUid = match.host
  const memberUids = Object.keys(match.members)
  const users = yield all(
    memberUids
      .filter(uid => !!uid && match.members[uid])
      .map(uid => call(readUserIfNecessary, uid))
  )
  const userMap = users.filter(user => !!user).reduce((prev, user) => ({...prev, [user.uid]: user}), {})
  yield put(setUsers(userMap))
}
const readMatchData = function* () {
  try {
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
  catch (e) {
    console.log(e)
  }
}

const dataSaga = function* (): Generator<*, *, *> {
  yield takeLatest([actionTypes.FETCH_ALL_DATA], readMatchData)
}

export {dataSaga}
