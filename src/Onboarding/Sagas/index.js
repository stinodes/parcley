// @flow
import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { NavigationService } from '../../Navigation';
import { authChanged, setUserInformation } from '../Redux';
import { readUserInfo } from '../helpers';

const authChangedChannel = auth =>
  eventChannel(emit => {
    auth.onAuthStateChanged(user => emit({ user }));
    return () => {};
  });
const authSaga = function*(): Generator<*, *, *> {
  try {
    const auth = yield call(firebase.auth);
    const channel = yield call(authChangedChannel, auth);
    while (true) {
      try {
        const { user } = yield take(channel);
        if (user) {
          yield put(authChanged(user));
          const userInfo = yield call(readUserInfo, user.uid);
          yield put(setUserInformation(userInfo));
          const action = NavigationActions.navigate({ routeName: 'App' });
          yield call(NavigationService.dispatch, action);
        } else {
          yield put(authChanged(null));
          yield put(setUserInformation(null));
          const action = NavigationActions.navigate({
            routeName: 'Onboarding',
          });
          yield call(NavigationService.dispatch, action);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
// const test = function* () {}

export { authSaga };
