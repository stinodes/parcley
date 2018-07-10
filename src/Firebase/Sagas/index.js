// @flow
import * as firebase from 'firebase'
import {eventChannel} from 'redux-saga'
import {call, take, put} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'

import {NavigationService} from '../../Navigation'
import {authChanged, setUserInformation} from '../Redux'
import {readUserInfo} from '../helpers/app'

const authChangedChannel = (auth) => eventChannel(emit => {
  auth.onAuthStateChanged((user) => emit({user}))
  return () => {}
})
const authSaga = function* (): Generator<*, *, *> {
  try {
    const auth = yield call(firebase.auth)
    const channel = yield call(authChangedChannel, auth)
    while (true) {
      try {
        const {user} = yield take(channel)
        console.log('user', user)
        if (user) {
          // yield put(authChanged(user))
          // const userInfo = yield call(readUserInfo, user.uid)
          // yield put(setUserInformation(userInfo))
          yield call(NavigationService.dispatch, NavigationActions.navigate({routeName: 'App'}))
        }
        if (!user) {
          // yield put(authChanged(null))
          // yield put(setUserInformation(null))
          yield call(NavigationService.dispatch, NavigationActions.navigate({routeName: 'Onboarding'}))
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  catch(e) {
    console.log(e)
  }
}

export {authSaga}
