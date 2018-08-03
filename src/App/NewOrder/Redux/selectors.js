// @flow
import type { State } from './reducer';

type Store = { newOrder: State };

const reducerState = (state: Store) => state.newOrder;
export const isPending = (state: Store) => reducerState(state).isPending;
export const isSuccessful = (state: Store) => reducerState(state).isSuccessful;
