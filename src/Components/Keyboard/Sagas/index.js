// @flow
import {Keyboard, Platform} from 'react-native'
import {eventChannel} from 'redux-saga'
import {call, fork, put, take, takeEvery} from 'redux-saga/effects'

import {actionTypes, keyboardHidden, keyboardShown} from '../Redux'

const keyboardChannel = () => eventChannel(emit => {
  const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
  const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
  const onHideSub = Keyboard.addListener(hideEvent, (event) => {
    emit({type: 'HIDE', event,})
  })
  const onShowSub = Keyboard.addListener(showEvent, (event) => {
    emit({type: 'SHOW', event,})
  })
  return () => {
    Keyboard.removeListener(hideEvent, onHideSub)
    Keyboard.removeListener(showEvent, onShowSub)
  }
})

const keyboardListenSaga = function* (): Generator<*, *, *> {
  const channel = yield call(keyboardChannel)
  while (true) {
    const {type, event} = yield take(channel)
    if (type === 'HIDE')
      yield put(keyboardHidden(event ? event.endCoordinates.height : 0))
    else if (type === 'SHOW')
      yield put(keyboardShown(event ? event.endCoordinates.height : 0))
  }
}
const keyboardDismissSaga = function* (): Generator<*, *, *> {
  yield call([Keyboard, 'dismiss'])
}

const keyboardSaga = function* (): Generator<*, *, *> {
  console.log('in saga')
  yield fork(keyboardListenSaga)
  yield takeEvery([actionTypes.HIDE_KEYBOARD], keyboardDismissSaga)
}

export {keyboardSaga, keyboardDismissSaga, keyboardListenSaga}
