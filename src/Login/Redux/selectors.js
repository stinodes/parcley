// @flow
import type { Store } from '../../flowtypes'

export const reducer = (state : Store) => state.login
export const pending = (state : Store) => reducer(state).pending
export const loginSuccess = (state : Store) => reducer(state).success
export const loginError = (state : Store) => reducer(state).error
export const loginFailed = (state : Store) => !!loginError(state)
