// @flow
import type {CreateMatchValues, JoinMatchValues} from '../Saga'

export const actionTypes: {
  CREATE_MATCH: 'NewMatch/CREATE_MATCH',
  JOIN_MATCH: 'NewMatch/JOIN_MATCH',
  SET_IS_PENDING: 'NewMatch/SET_IS_PENDING',
  SET_IS_SUCCESSFUL: 'NewMatch/SET_IS_SUCCESSFUL',
} = {
  CREATE_MATCH: 'NewMatch/CREATE_MATCH',
  JOIN_MATCH: 'NewMatch/JOIN_MATCH',
  SET_IS_PENDING: 'NewMatch/SET_IS_PENDING',
  SET_IS_SUCCESSFUL: 'NewMatch/SET_IS_SUCCESSFUL',
}

type NewMatchAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type CreateMatch = NewMatchAction<typeof actionTypes.CREATE_MATCH, CreateMatchValues>
type JoinMatch = NewMatchAction<typeof actionTypes.JOIN_MATCH, JoinMatchValues>
type SetIsCreating = NewMatchAction<typeof actionTypes.SET_IS_PENDING, boolean>
type SetIsSuccessful = NewMatchAction<typeof actionTypes.SET_IS_SUCCESSFUL, boolean>
export type ReducerAction = |SetIsCreating

export const createMatch = (match: CreateMatchValues): CreateMatch => ({type: actionTypes.CREATE_MATCH, payload: match})
export const joinMatch = (match: JoinMatchValues): JoinMatch => ({type: actionTypes.JOIN_MATCH, payload: match})
export const setIsPending = (isPending: boolean): SetIsCreating => ({type: actionTypes.SET_IS_PENDING, payload: isPending})
export const setIsSuccessful = (isSuccessful: boolean): SetIsSuccessful => ({type: actionTypes.SET_IS_SUCCESSFUL, payload: isSuccessful})
