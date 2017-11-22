// @flow
import { all, fork } from 'redux-saga/effects'

import { saga as loginSaga } from './Login/Redux'
import { saga as firebaseSaga } from './Firebase/Redux'

export default () =>
  function* () : Generator <*, *, *> {
    yield all([
      fork(loginSaga),
      fork(firebaseSaga),
    ])
  }
