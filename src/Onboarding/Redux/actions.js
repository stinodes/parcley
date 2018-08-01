// @flow
import type {User} from 'firebase'
import type {UserInformation} from 'parcley'

export const actionTypes: {
  'AUTH_CHANGED': 'Auth/AUTH_CHANGED',
  'LOGGED_IN': 'Auth/LOGGED_IN',
  'LOGGED_OUT': 'Auth/LOGGED_OUT',
  'SET_USER_INFO': 'Auth/SET_USER_INFO',
} = {
  'AUTH_CHANGED': 'Auth/AUTH_CHANGED',
  'LOGGED_IN': 'Auth/LOGGED_IN',
  'LOGGED_OUT': 'Auth/LOGGED_OUT',
  'SET_USER_INFO': 'Auth/SET_USER_INFO',
}

type FirebaseAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type AuthChanged = FirebaseAction<typeof actionTypes.AUTH_CHANGED, ?User>
type SetUserInformation = FirebaseAction<typeof actionTypes.SET_USER_INFO, ?UserInformation>
export type ReducerAction = |AuthChanged|SetUserInformation

export const authChanged = (user: ?User): AuthChanged => ({type: actionTypes.AUTH_CHANGED, payload: user})
export const setUserInformation = (userInfo: ?UserInformation): SetUserInformation => ({type: actionTypes.SET_USER_INFO, payload: userInfo})
