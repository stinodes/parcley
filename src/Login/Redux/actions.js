// @flow
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ONBOARDING_PENDING,
  ONBOARDING_SUCCESS,
  ONBOARDING_FAILURE,
} from './actionTypes'

import type { ActionCreator } from 'redux'
import type { ActionTypes } from './actionTypes'

export type OnboardingAction<ActionType : ActionTypes, Payload> = Action<ActionType, Payload>
export type Login = OnboardingAction<typeof LOGIN, {email: string, password: string}>
export type Register = OnboardingAction<typeof REGISTER, {displayName : string, email: string, password: string}>
export type Logout = OnboardingAction<typeof LOGOUT, void>
type SetOnboardingPending = OnboardingAction<typeof ONBOARDING_PENDING, void>
type SetOnboardingSuccess = OnboardingAction<typeof ONBOARDING_SUCCESS, void>
type SetOnboardingFailure = OnboardingAction<typeof ONBOARDING_FAILURE, void>

export type OnboardingActions = Login|Register|SetOnboardingPending|SetOnboardingSuccess|SetOnboardingFailure

export const login : ActionCreator<Login, *> = (email: string, password: string) =>
  ({ type: LOGIN, payload: {email, password}})
export const register : ActionCreator<Register, *> = (displayName : string, email: string, password: string) =>
  ({ type: REGISTER, payload: {displayName, email, password}})
export const logout : ActionCreator<Logout, *> = () =>
  ({ type: LOGOUT, payload: undefined })
export const setOnboardingPending : ActionCreator<SetOnboardingPending, *> = (register?: boolean) =>
  ({ type: ONBOARDING_PENDING, payload: undefined })
export const setOnboardingSuccess : ActionCreator<SetOnboardingSuccess, *> = () =>
  ({ type: ONBOARDING_SUCCESS, payload: undefined })
export const setOnboardingFailure : ActionCreator<SetOnboardingFailure, *> = (error: ?Error) =>
  ({ type: ONBOARDING_FAILURE, payload: undefined })
