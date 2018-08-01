// @flow
import type {State} from './reducer'
type Store = {
  data: State,
}

const reducerState = (state: Store) => state.data
export const isPending = (state: Store) => reducerState(state).pending
export const orders = (state: Store) => reducerState(state).orders
export const order = (state: Store, id: string) => orders(state)[id]
export const hasOrders = (state: Store) => Object.keys(orders(state)).length !== 0
export const users = (state: Store) => reducerState(state).users
export const user = (state: Store, id: string) => users(state)[id]
export const hasUsers = (state: Store) => Object.keys(users(state)).length !== 0
