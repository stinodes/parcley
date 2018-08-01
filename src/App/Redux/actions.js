// @flow
import type {Order, UserInformation, Id} from 'coolio'

export const actionTypes: {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  SET_ORDERS: 'Data/SET_ORDERS',
  
  SET_USERS: 'Data/SET_USERS',
} = {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  SET_ORDERS: 'Data/SET_ORDERS',
  
  SET_USERS: 'Data/SET_USERS',
}

type DataAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type FetchAllData = DataAction<typeof actionTypes.FETCH_ALL_DATA>
type SetPending = DataAction<typeof actionTypes.SET_PENDING, boolean>
type SetOrders = DataAction<typeof actionTypes.SET_ORDERS, {[Id]: Order}>
type SetUsers = DataAction<typeof actionTypes.SET_USERS, {[Id]: UserInformation}>
export type DataReducerActions = |SetPending|SetOrders|SetUsers

export const setPending = (pending: boolean): SetPending => ({type: actionTypes.SET_PENDING, payload: pending})
export const fetchAllData = (): FetchAllData => ({type: actionTypes.FETCH_ALL_DATA, payload: undefined})
export const setOrder = (order: Order): SetOrders => ({type: actionTypes.SET_ORDERS, payload: {[order.uid]: order}})
export const setOrders = (orders: {[Id]: Order}): SetOrders => ({type: actionTypes.SET_ORDERS, payload: orders})
export const setUser = (user: UserInformation): SetUsers => ({type: actionTypes.SET_USERS, payload: {[user.uid]: user}})
export const setUsers = (users: {[Id]: UserInformation}): SetUsers => ({type: actionTypes.SET_USERS, payload: users})
