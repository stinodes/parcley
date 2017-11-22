// @flow
import firebase from 'firebase'
import { put, call, take, fork, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import * as actions from './actions'
import type { Register, Login, Logout } from './actions'

const register = function* () {
  while (true) {
    try {
      const { payload } : Register = yield take(actionTypes.REGISTER)

      const firebaseAuth = firebase.auth()

      if (payload instanceof Error) {
        return
      }

      yield put(actions.setOnboardingPending())

      const {displayName, email, password} = payload
      yield call([firebaseAuth, firebaseAuth.setPersistence], firebase.auth.Auth.Persistence.LOCAL)
      const user = yield call([firebaseAuth, firebaseAuth.createUserWithEmailAndPassword], email, password)

      yield call([user, user.updateProfile], {displayName})

      yield put(actions.setOnboardingSuccess())

    }
    catch (e) {
      console.log('error', e)
      yield put(actions.setOnboardingFailure())
    }
  }
}

const login = function* () {
  while (true) {
    try {
      console.log('saga')
      const { payload } : Login = yield take(actionTypes.LOGIN)
      console.log('login', payload)
      const firebaseAuth = firebase.auth()

      if (payload instanceof Error) {
        return
      }

      yield put(actions.setOnboardingPending())

      const {email, password} = payload
      yield call([firebaseAuth, firebaseAuth.setPersistence], firebase.auth.Auth.Persistence.LOCAL)
      const user = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], email, password)
      console.log(user)

      yield put(actions.setOnboardingSuccess())

    }
    catch (e) {
      console.log('error', e)
      yield put(actions.setOnboardingFailure())
    }
  }
}

const logout = function* () {
  while (true) {
    try {
      const { payload } : Logout = yield take(actionTypes.LOGOUT)
      const firebaseAuth = firebase.auth()

      if (payload instanceof Error) {
        return
      }

      yield put(actions.setOnboardingPending())

      yield call([firebaseAuth, firebaseAuth.setPersistence], firebase.auth.Auth.Persistence.LOCAL)
      yield call([firebaseAuth, firebaseAuth.signOut])

      yield put(actions.setOnboardingSuccess())

    }
    catch (e) {
      console.log('error', e)
      yield put(actions.setOnboardingFailure())
    }
  }
}

const loginRootSaga = function* () : Generator<*, *, *> {
  yield all([
    fork(login),
    fork(register),
    fork(logout),
  ])
}

export default loginRootSaga
