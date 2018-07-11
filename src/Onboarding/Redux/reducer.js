// @flow
import {setIn} from 'fnional'
import {actionTypes} from './actions'
import type {User} from 'firebase'
import type {Reducer} from 'redux'
import type {ReducerAction} from './actions'
import type {UserInformation} from '../helpers'

export type State = {
  user: ?User,
  userInformation: ?UserInformation,
}
const initialState: State = {
  user: null,
  userInformation: null,
}
const reducer: Reducer<State, ReducerAction> = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_CHANGED:
      return setIn(state, 'user', action.payload)
    case actionTypes.SET_USER_INFO:
      return setIn(state, 'userInformation', action.payload)
    default:
      return state
  }
}

export {reducer}
