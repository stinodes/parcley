// @flow
import type {Reducer} from 'redux'
import type {Id, Match, UserInformation} from 'coolio'
import type {DataReducerActions} from './actions'
import {actionTypes} from './actions'
import {setIn, shallowMerge} from 'fnional'

type State = {
  pending: boolean,
  matches: {[Id]: Match},
  users: {[Id]: UserInformation},
}
const initialState = {
  pending: false,
  matches: {},
  users: {},
}

const reducer: Reducer<State, DataReducerActions> = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_PENDING:
      return setIn(state, 'pending', action.payload)
    case actionTypes.SET_MATCHES:
      return setIn(state, 'matches', shallowMerge(state.matches, action.payload))
    case actionTypes.SET_USERS:
      return setIn(state, 'users', shallowMerge(state.users, action.payload))
    default:
      return state
  }
}

export {reducer, initialState}
export type {State}
