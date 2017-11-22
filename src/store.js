// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import sagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'
import { reducer as form } from 'redux-form'
import { connectRoutes } from 'redux-first-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxNavigation  from 'redux-first-router-navigation'

import createReducer from './createRootReducer'
import createRootSaga from './createRootSaga'
import { Main } from './Navigation'
import routeMap from './Navigation/routeMap'

import type { History } from './flowtypes'

export default (history : History) => {
  const initialPath = history.entries[0].pathname
  const { reducer, middleware, enhancer } = connectRoutes(
    history,
    routeMap,
    {
      navigators: reduxNavigation({
        mainStack: Main,
      })
    }
  )

  const saga = sagaMiddleware()
  const middlewares = applyMiddleware(thunkMiddleware, saga, middleware)
  const reducers = createReducer({ location: reducer, form }, initialPath)
  const composeEnhancers = __DEV__ ? composeWithDevTools({}) : compose

  const store = createStore(reducers, composeEnhancers(enhancer, middlewares))

  window.HIST = history
  window.Store = store

  saga.run(createRootSaga())

  return store
}
