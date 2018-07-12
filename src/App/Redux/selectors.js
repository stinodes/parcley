// @flow
import type {State} from './reducer'
type Store = {
  data: State,
}

const reducerState = (state: Store) => state.data
export const isPending = (state: Store) => reducerState(state).pending
export const matches = (state: Store) => reducerState(state).matches
export const match = (state: Store, id: string) => matches(state)[id]
export const hasMatches = (state: Store) => Object.keys(matches(state)).length !== 0
export const users = (state: Store) => reducerState(state).users
export const user = (state: Store, id: string) => users(state)[id]
export const hasUsers = (state: Store) => Object.keys(users(state)).length !== 0
