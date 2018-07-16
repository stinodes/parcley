// @flow
import {all, call, select, put, takeLatest} from 'redux-saga/effects'

import {meInfo} from '../../../Onboarding/Redux/selectors'
import {addMatchToUser, createMatch, uidForUsername} from '../../helpers'
import {readUserIfNecessary} from '../../Saga'

import type {Unsynced, Match} from 'coolio'
import {setMatch} from '../../Redux'
import {actionTypes} from '../Redux/actions'
import {setIsCreating} from '../Redux'

export type CreateMatchValues = {
  name: string,
  description: string,
  members: string | string[],
  isPrivate: boolean,
}
const createMatchSaga = function* (action) {
  yield put(setIsCreating(true))
  
  const match = action.payload
  const me = yield select(meInfo)
  
  const memberUsernameArray: string[] = !Array.isArray(match.members) ?
    match.members.split(', ') :
    match.members
  const membersWithoutMe = memberUsernameArray.filter(username => username !== me.username)
  const membersUidArray = yield all(
    membersWithoutMe.map(
      uid => call(uidForUsername, uid)
    )
  )
  
  const filteredUidArray = membersUidArray.filter(uid => !!uid)
  
  let members = yield all(
    filteredUidArray.map(uid => call(readUserIfNecessary, uid, true))
  )
  members = [me, ...members]
  
  const matchValues: Unsynced<Match> = {
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
  
  yield put(setIsCreating(false))
}

export const newMatchSaga = function* (): Generator<*, *, *> {
  yield takeLatest([actionTypes.CREATE_MATCH], createMatchSaga)
}
