// @flow
import type {User} from 'firebase'

const actionTypes: {
  'AUTH_CHANGED': 'Auth/AUTH_CHANGED',
  'LOGGED_IN': 'Auth/LOGGED_IN',
  'LOGGED_OUT': 'Auth/LOGGED_OUT',
} = {
  'AUTH_CHANGED': 'Auth/AUTH_CHANGED',
  'LOGGED_IN': 'Auth/LOGGED_IN',
  'LOGGED_OUT': 'Auth/LOGGED_OUT',
}

type FirebaseAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type AuthChanged = FirebaseAction<typeof actionTypes.AUTH_CHANGED, ?User>
export type ReducerAction = |AuthChanged

export const authChanged = (user: ?User): AuthChanged => ({type: actionTypes.AUTH_CHANGED, payload: user})
