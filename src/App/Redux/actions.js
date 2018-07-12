// @flow
import type {Match, UserInformation, Id} from 'coolio'

export const actionTypes: {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  SET_MATCHES: 'Data/SET_MATCHES',
  
  SET_USERS: 'Data/SET_USERS',
} = {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  SET_MATCHES: 'Data/SET_MATCHES',
  
  SET_USERS: 'Data/SET_USERS',
}

type DataAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<Type, Payload>
type FetchAllData = DataAction<typeof actionTypes.FETCH_ALL_DATA>
type SetPending = DataAction<typeof actionTypes.SET_PENDING, boolean>
type SetMatches = DataAction<typeof actionTypes.SET_MATCHES, {[Id]: Match}>
type SetUsers = DataAction<typeof actionTypes.SET_USERS, {[Id]: UserInformation}>
export type DataReducerActions = |SetPending|SetMatches|SetUsers

export const setPending = (pending: boolean): SetPending => ({type: actionTypes.SET_PENDING, payload: pending})
export const fetchAllData = (): FetchAllData => ({type: actionTypes.FETCH_ALL_DATA, payload: undefined})
export const setMatch = (match: Match): SetMatches => ({type: actionTypes.SET_MATCHES, payload: {[match.uid]: match}})
export const setMatches = (matches: {[Id]: Match}): SetMatches => ({type: actionTypes.SET_MATCHES, payload: matches})
export const setUser = (user: UserInformation): SetUsers => ({type: actionTypes.SET_USERS, payload: {[user.uid]: user}})
export const setUsers = (users: {[Id]: UserInformation}): SetUsers => ({type: actionTypes.SET_USERS, payload: users})
