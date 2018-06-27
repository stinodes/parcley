// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import sagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {createRootReducer} from './createRootReducer'
import {createRootSaga} from './createRootSaga'

import type {Reducer} from 'redux'

export const createReduxStore = () => {
  const saga = sagaMiddleware()
  const middlewares = applyMiddleware(thunkMiddleware, saga)
  const reducers: Reducer<Store, *> = createRootReducer({})
  const composeEnhancers = __DEV__ ? composeWithDevTools({}) : compose
  
  const store = createStore(reducers, undefined, composeEnhancers(middlewares))
  
  window.Store = store
  
  saga.run(createRootSaga())
  
  return store
}
export * from './flowtypes'
