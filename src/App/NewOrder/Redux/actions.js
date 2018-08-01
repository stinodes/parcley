// @flow
import type {CreateOrderValues, JoinOrderValues} from '../Saga'

export const actionTypes: {
  CREATE_ORDER: 'NewOrder/CREATE_ORDER',
  JOIN_ORDER: 'NewOrder/JOIN_ORDER',
  SET_IS_PENDING: 'NewOrder/SET_IS_PENDING',
  SET_IS_SUCCESSFUL: 'NewOrder/SET_IS_SUCCESSFUL',
} = {
  CREATE_ORDER: 'NewOrder/CREATE_ORDER',
  JOIN_ORDER: 'NewOrder/JOIN_ORDER',
  SET_IS_PENDING: 'NewOrder/SET_IS_PENDING',
  SET_IS_SUCCESSFUL: 'NewOrder/SET_IS_SUCCESSFUL',
}

type NewOrderAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type CreateOrder = NewOrderAction<typeof actionTypes.CREATE_ORDER, CreateOrderValues>
type JoinOrder = NewOrderAction<typeof actionTypes.JOIN_ORDER, JoinOrderValues>
type SetIsCreating = NewOrderAction<typeof actionTypes.SET_IS_PENDING, boolean>
type SetIsSuccessful = NewOrderAction<typeof actionTypes.SET_IS_SUCCESSFUL, boolean>
export type ReducerAction = |SetIsCreating

export const createOrder = (order: CreateOrderValues): CreateOrder => ({type: actionTypes.CREATE_ORDER, payload: order})
export const joinOrder = (order: JoinOrderValues): JoinOrder => ({type: actionTypes.JOIN_ORDER, payload: order})
export const setIsPending = (isPending: boolean): SetIsCreating => ({type: actionTypes.SET_IS_PENDING, payload: isPending})
export const setIsSuccessful = (isSuccessful: boolean): SetIsSuccessful => ({type: actionTypes.SET_IS_SUCCESSFUL, payload: isSuccessful})
