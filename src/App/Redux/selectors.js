// @flow
import type { State } from './reducer';
import type { Id } from 'parcley';
type Store = {
  data: State,
};

const reducerState = (state: Store) => state.data;
export const isPending = (state: Store) => reducerState(state).pending;
export const orders = (state: Store) => reducerState(state).orders;
export const order = (state: Store, id: Id) => orders(state)[id];
export const hasOrders = (state: Store) =>
  Object.keys(orders(state)).length !== 0;
export const members = (state: Store, orderUid: string) =>
  reducerState(state).members[orderUid] || {};
export const member = (state: Store, orderUid: string, memberUid: string) =>
  members(state, orderUid)[memberUid];
export const users = (state: Store) => reducerState(state).users;
export const user = (state: Store, id: Id) => users(state)[id];
export const hasUsers = (state: Store) =>
  Object.keys(users(state)).length !== 0;
export const friends = (state: Store) => reducerState(state).friends;
export const friend = (state: Store, uid: Id) => friends(state)[uid];
export const isFriend = (state: Store, uid: Id) => !!friend(state, uid);
