// @flow
import type {State} from './reducer'
type Store = {
  auth: State,
}

const reducerState = (state: Store) => state.auth
export const user = (state: Store) => reducerState(state).user
export const userInfo = (state: Store) => reducerState(state).userInformation
