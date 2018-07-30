// @flow
import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {setMatches, setPending, setUsers} from '../Redux'
import {readMatch, readMatches, readUserInfo} from '../helpers'

import type {Id, Match, Unsynced, UserInformation} from 'coolio'
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
    const meUid = yield select(meId)
    const meInfo = yield call(readUserIfNecessary, meUid, true)
    const matchUids = Object.keys(meInfo.joinedMatches)
    
    const matches = yield all(
      matchUids.map( uid =>
        call(readMatch, uid)
      )
    )
    // TODO: remove non-existent matches from own user
    const matchMap = toEntityMap(matches)
    yield put(setMatches(matchMap))
    
    const userUidMap = matches.reduce((prev, match) => ({...prev, ...match.members}), {})
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
  yield takeLatest([actionTypes.FETCH_ALL_DATA], readMatchData)
}

export {dataSaga}
