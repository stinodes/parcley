// @flow
import type {State} from './reducer'

type Store = {
  keyboard: State,
}

export const reducerState = (store: Store) => store.keyboard
export const keyboardHeight = (store: Store) => reducerState(store).keyboardHeight
export const keyboardActive = (store: Store) => !!reducerState(store).keyboardActive
