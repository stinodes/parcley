// @flow
import { all, fork } from 'redux-saga/effects'
import {authSaga} from '../Onboarding/Sagas'
import {dataSaga} from '../App/Saga'

export const createRootSaga = () =>
  function* () : Generator <*, *, *> {
    yield all([
      fork(authSaga),
      fork(dataSaga),
    ])
  }
