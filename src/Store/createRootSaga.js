// @flow
import { all, fork } from 'redux-saga/effects'
import {keyboardSaga} from '../Components/Keyboard/Sagas'

export const createRootSaga = () =>
  function* () : Generator <*, *, *> {
    yield all([
      // fork(keyboardSaga),
    ])
  }
