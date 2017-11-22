// @flow
import firebase from 'firebase'
import { eventChannel } from 'redux-saga'
import { takeLatest, put, call, take, } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const initializeFirebase = function* (action) {

  try {

    const meta = action.meta

    yield put(actions.initFirebasePending())

    yield put(actions.setAuth(firebase.auth().currentUser))

    const isAuthChannel = yield call(() =>
      eventChannel(emit => {
        firebase.auth().onAuthStateChanged((user) => {
          emit({user})
        })

        return () => {}
      })
    )

    yield put({...actions.initFirebaseSuccess(), meta})

    while (true) {
      const authState = yield take(isAuthChannel)
      console.log(authState)

      yield put(actions.setAuth(authState.user))

      let navigateAction = {
        type: NavigationActions.NAVIGATE,
        routeName: 'Onboarding',
        params: { mode: 'login' }
      }

      if (!!authState.user) {
        navigateAction = {
          type: NavigationActions.NAVIGATE,
          routeName: 'Home',
        }
      }

      yield put({
          type: NavigationActions.RESET,
          index: 0,
          navKey: 'mainStack',
          actions: [
            navigateAction
          ],
      })

    }
  }

  catch(e) {
    console.log('error in firebase saga', e)
    yield put(actions.initFirebaseFailure())
  }

}

const firebaseRootSaga = function* () : Generator<*, *, *> {
  yield takeLatest(actionTypes.INIT_FIREBASE, initializeFirebase)
}

export default firebaseRootSaga
