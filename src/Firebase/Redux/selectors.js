// @flow
import type { Store } from '../../flowtypes'

export const reducer = (state : Store) => state.firebase
export const user = (state : Store) => reducer(state).user
export const uid = (state : Store) => {
  const _user = user(state)
  return _user && _user.uid
}
export const displayName = (state : Store) => {
  const _user = user(state)
  return _user && _user.displayName
}
