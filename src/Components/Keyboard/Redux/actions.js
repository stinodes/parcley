// @flow
import {actionTypes} from './actionTypes'

import type {ActionCreator} from 'redux'
import {keyboardHeight} from './selectors'

type KeyboardAction<Type: $Values<typeof actionTypes>, Payload> = Action<Type, Payload>
type HideKeyboard = KeyboardAction<typeof actionTypes.HIDE_KEYBOARD, void>
type KeyboardHidden = KeyboardAction<typeof actionTypes.KEYBOARD_HIDDEN, number>
type KeyboardShown = KeyboardAction<typeof actionTypes.KEYBOARD_SHOWN, number>
export type KeyboardActions = | KeyboardHidden | KeyboardShown

export const hideKeyboard: ActionCreator<HideKeyboard, void> = () =>
  ({type: actionTypes.HIDE_KEYBOARD, payload: undefined})
export const keyboardHidden: ActionCreator<KeyboardHidden, number> = (height: number) =>
  ({type: actionTypes.KEYBOARD_HIDDEN, payload: height})
export const keyboardShown: ActionCreator<KeyboardShown, number> = (height: number) =>
  ({type: actionTypes.KEYBOARD_SHOWN, payload: height})
