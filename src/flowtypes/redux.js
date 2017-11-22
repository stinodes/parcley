// @flow
import type { State as LoginState } from '../Login/Redux/reducer'
import type { State as FirebaseState } from '../Firebase/Redux/reducer'

export type PromiseMeta = { +thunk: true }

export type Store = {
  login: LoginState,
  firebase: FirebaseState,
  location: *,
  mainStack: *,
}

