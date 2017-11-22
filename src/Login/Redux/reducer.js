// @flow
import * as actionTypes from './actionTypes'

import type { Reducer } from 'redux'
import type { OnboardingActions } from './actions'

export type State = {
  +pending: boolean,
  +success: boolean,
  +error: ?Error,
}
const initialState : State = {
  pending: false,
  success: false,
  error: null,
}

const login : Reducer<State, OnboardingActions> = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ONBOARDING_PENDING:
      return {...state, success: false, pending: true}
    case actionTypes.ONBOARDING_SUCCESS:
      return {...state, success: true, pending: false}
    case actionTypes.ONBOARDING_FAILURE:
      return {...state, success: false, error: action.payload, pending: false}
  }
  return state
}

export default login
