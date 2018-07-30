// @flow
import {all, call, put, select, takeLatest} from 'redux-saga/effects'

import {meInfo} from '../../../Onboarding/Redux/selectors'
import {addMatchToUser, createMatch, generateMatchCode, joinMatch, uidForMatchCode, uidForUsername} from '../../helpers'
import {readUserIfNecessary} from '../../Saga'

import type {Match, Unsynced} from 'coolio'
import {setMatch} from '../../Redux'
import {actionTypes} from '../Redux/actions'
import {setIsPending, setIsSuccessful} from '../Redux'
import {createError} from '../../../Utils/messageBar'

export type CreateMatchValues = {
  name: string,
  description: string,
  members: string | string[],
  isPrivate: boolean,
}
export type JoinMatchValues = {
  code: string,
}

const createMatchSaga = function* (action) {
  try {
    yield put(setIsPending(true))
    
    const match = action.payload
    const me = yield select(meInfo)
    
    const memberUsernameArray: string[] = !Array.isArray(match.members) ?
      match.members.split(', ') :
      match.members
    const membersWithoutMe = memberUsernameArray.filter(username => username !== me.username)
    const membersUidArray = yield all(
      membersWithoutMe.map(
        username => call(uidForUsername, username)
      )
    )
    
    const filteredUidArray = membersUidArray.filter(uid => !!uid)
    
    let members = yield all(
      filteredUidArray.map(uid => call(readUserIfNecessary, uid, true))
    )
    members = [me, ...members]
    
    const code = yield call(generateMatchCode)
    
    const matchValues: Unsynced<Match> = {
      code,
      name: match.name,
      description: match.description,
      isPrivate: false,
      host: me.uid,
      startedOn: Date.now(),
      members: members.map(member => ({
        username: member.username,
        score: 0,
        uid: member.uid,
      })),
    }
    const result = yield call(createMatch, matchValues)
    yield put(setMatch(result))
    yield all(
      members.map(member =>
        call(addMatchToUser, member.uid, result.uid)
      )
    )
    
    yield put(setIsSuccessful(true))
    yield put(setIsPending(false))
  }
  catch (e) {
    console.log(e)
    yield put(setIsSuccessful(false))
    yield put(setIsPending(false))
    yield call(
      createError,
      {
        message: e.message,
      }
    )
  }
}

const joinMatchSaga = function* (action) {
  try {
    yield put(setIsPending(true))
    
    const {code} = action.payload
    const matchUid = yield call(uidForMatchCode, code)
    
    if (!matchUid)
      throw new Error('Not an existing match')
    
    const userInfo = yield select(meInfo)
    
    const member = {
      uid: userInfo.uid,
      username: userInfo.username,
      score: null,
    }
    yield call(joinMatch, matchUid, member)
    yield call(addMatchToUser, member.uid, matchUid)
    
    yield put(setIsSuccessful(true))
    yield put(setIsPending(false))
  }
  catch (e) {
    console.log(e)
    yield put(setIsSuccessful(false))
    yield put(setIsPending(false))
    yield call(
      createError,
      {
        message: e.message,
      }
    )
  }
}

export const newMatchSaga = function* (): Generator<*, *, *> {
  yield takeLatest([actionTypes.CREATE_MATCH], createMatchSaga)
  yield takeLatest([actionTypes.JOIN_MATCH], joinMatchSaga)
}
