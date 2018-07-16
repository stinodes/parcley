// @flow
import type {CreateMatchValues} from '../Saga'

export const actionTypes: {
  CREATE_MATCH: 'NewMatch/CREATE_MATCH',
  SET_IS_CREATING: 'NewMatch/SET_IS_CREATING',
} = {
  CREATE_MATCH: 'NewMatch/CREATE_MATCH',
  SET_IS_CREATING: 'NewMatch/SET_IS_CREATING',
}

type NewMatchAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type CreateMatch = NewMatchAction<typeof actionTypes.CREATE_MATCH, CreateMatchValues>
type SetIsCreating = NewMatchAction<typeof actionTypes.SET_IS_CREATING, boolean>
export type ReducerAction = |SetIsCreating

export const createMatch = (match: CreateMatchValues): CreateMatch => ({type: actionTypes.CREATE_MATCH, payload: match})
export const setIsCreating = (isCreating: boolean): SetIsCreating => ({type: actionTypes.SET_IS_CREATING, payload: isCreating})
