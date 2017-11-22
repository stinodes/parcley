// @flow
import {
  INIT_FIREBASE,
  INIT_FIREBASE_PENDING,
  INIT_FIREBASE_SUCCESS,
  INIT_FIREBASE_FAILURE,
  SET_USER,
} from './actionTypes'

import type { ActionCreator } from 'redux'

import type { ActionTypes } from './actionTypes'
import type { PromiseMeta } from '../../flowtypes/redux'
import type { User } from './reducer'

export type FirebaseAction<ActionType : ActionTypes, Payload> = Action<ActionType, Payload>
type InitFirebase = FirebaseAction<typeof INIT_FIREBASE, void>
type InitFirebasePending = FirebaseAction<typeof INIT_FIREBASE_PENDING, void>
type InitFirebaseSuccess = FirebaseAction<typeof INIT_FIREBASE_SUCCESS, void>
type InitFirebaseFailure = FirebaseAction<typeof INIT_FIREBASE_FAILURE, void>
type SetUser = FirebaseAction<typeof SET_USER, ?User>

export type FirebaseActions = InitFirebase|InitFirebasePending|InitFirebaseSuccess|InitFirebaseFailure|SetUser

export const initFirebase : ActionCreator< InitFirebase,*> = () =>
  ({ type: INIT_FIREBASE, payload: undefined, meta: { thunk: true }})
export const initFirebasePending : ActionCreator< InitFirebasePending,*> = () =>
  ({ type: INIT_FIREBASE_PENDING, payload: undefined, })
export const initFirebaseSuccess : ActionCreator< InitFirebaseSuccess,*> = (meta: PromiseMeta) =>
  ({type: INIT_FIREBASE_SUCCESS, payload: undefined, meta})
export const initFirebaseFailure : ActionCreator< InitFirebaseFailure,*> = (error: Error, meta: PromiseMeta) =>
  ({type: INIT_FIREBASE_FAILURE, error: true, payload: error, meta})
export const setAuth : ActionCreator< SetUser, *> = (user: ?User) =>
  ({type: SET_USER, payload: user})
