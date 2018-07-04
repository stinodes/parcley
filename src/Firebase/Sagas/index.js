// @flow
import * as firebase from 'firebase'
import {eventChannel} from 'redux-saga'
import {call, take} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'

import {NavigationService} from '../../Navigation'

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
        if (user)
          yield call(NavigationService.dispatch, NavigationActions.navigate({routeName: 'App'}))
        if (!user)
          yield call(NavigationService.dispatch, NavigationActions.navigate({routeName: 'Onboarding'}))
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
