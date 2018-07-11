// @flow
import {combineReducers} from 'redux'

import {reducer as auth} from '../Onboarding/Redux'

import type {Reducer} from 'redux'

const createRootReducer = (libraryReducers: {[string]: Reducer<*, *>}) => combineReducers({
  ...libraryReducers,
  auth,
})

export {createRootReducer}
