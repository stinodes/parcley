// @flow
import {combineReducers} from 'redux'

import {reducer as auth} from '../Onboarding/Redux'
import {reducer as data} from '../App/Redux'
import {reducer as newOrder} from '../App/NewOrder/Redux'

import type {Reducer} from 'redux'

const createRootReducer = (libraryReducers: {[string]: Reducer<*, *>}) => combineReducers({
  ...libraryReducers,
  auth,
  data,
  newOrder,
})

export {createRootReducer}
