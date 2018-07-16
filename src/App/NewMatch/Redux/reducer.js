// @flow
import type {Reducer} from 'redux'
import type {ReducerAction} from './actions'
import {actionTypes} from './actions'
import {setIn} from 'fnional'

type State = {
  isCreating: boolean,
}
const initialState: State = {
  isCreating: false,
}

const reducer: Reducer<State, ReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_CREATING:
      return setIn(state, 'isCreating', action.payload)
    default:
      return state
  }
}

export {reducer}
export type {State}
