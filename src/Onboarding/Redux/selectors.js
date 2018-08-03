// @flow
import type { State } from './reducer';
type Store = {
  auth: State,
};

const reducerState = (state: Store) => state.auth;
export const me = (state: Store) => reducerState(state).user;
export const meInfo = (state: Store) => reducerState(state).userInformation;
export const meId = (state: Store) => {
  const user = reducerState(state).user;
  return user && user.uid;
};
