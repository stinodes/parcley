// @flow
import type {Reducer} from 'redux'
import type {KeyboardActions} from './actions'
import {actionTypes} from './actionTypes'

type State = {
  keyboardHeight: number,
  keyboardActive: boolean,
}
const initialState: State = {
  keyboardHeight: 0,
  keyboardActive: false,
}
const reducer: Reducer<State, KeyboardActions> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.KEYBOARD_HIDDEN:
      return {...state, keyboardHeight: !action.payload ? state.keyboardHeight : action.payload, keyboardActive: false,}
    case actionTypes.KEYBOARD_SHOWN:
      return {...state, keyboardHeight: action.payload, keyboardActive: true,}
    default:
      return state
  }
}

export type {State}
export {reducer, initialState}
