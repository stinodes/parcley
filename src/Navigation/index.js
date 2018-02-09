// @flow
import {reducer as rootNavigationReducer, RootNavigator, rootNavigatorMiddleware} from './RootNavigator'
import {combineReducers} from 'redux'

import type {Reducer} from 'redux'

export type NavigationState = {
  root: Object,
}

const reducer: Reducer<NavigationState, *> = combineReducers({
  root: rootNavigationReducer,
})

export {RootNavigator, rootNavigatorMiddleware, reducer}