// @flow
import type {State} from './reducer'

type Store = {newMatch: State}

const reducerState = (state: Store) => state.newMatch
export const isCreating = (state: Store) => reducerState(state).isCreating
