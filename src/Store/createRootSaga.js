// @flow
import { all, fork } from 'redux-saga/effects'
import {authSaga} from '../Firebase/Sagas'

export const createRootSaga = () =>
  function* () : Generator <*, *, *> {
    yield all([
      fork(authSaga),
    ])
  }
