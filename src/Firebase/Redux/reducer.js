// @flow
import * as actionTypes from './actionTypes'

import type { Reducer } from 'redux'
import type { FirebaseActions } from './actions'

export type User = {
  +uid: string,
  +email: ?string,
  +isAnonymous: boolean,
  +photoURL: ?string,
  +displayName: ?string,
}
export type State = {
  +initializing: boolean,
  +isInitialized: boolean,
  +user: ?User,
}
const initialState : State = {
  initializing: false,
  isInitialized: false,
  user: null,
}

const reducer: Reducer<State, FirebaseActions> = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INIT_FIREBASE_PENDING:
      return {...state, initializing: true}
    case actionTypes.INIT_FIREBASE_SUCCESS:
    case actionTypes.INIT_FIREBASE_FAILURE:
      return {
        ...state,
        initializing: false,
        initialized: action.error,
      }
    case actionTypes.SET_USER:
      if (action.payload instanceof Error)
        return state
      return {...state, user: action.payload}
  }

  return state
}

export default reducer
