// @flow
import type {State} from './reducer'

type Store = {newMatch: State}

const reducerState = (state: Store) => state.newMatch
export const isPending = (state: Store) => reducerState(state).isPending
export const isSuccessful = (state: Store) => reducerState(state).isSuccessful
