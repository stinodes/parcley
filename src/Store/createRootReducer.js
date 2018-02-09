// @flow
import {combineReducers} from 'redux'

import {reducer as navigation} from '../Navigation'

import type {Reducer} from 'redux'

const createRootReducer = (libraryReducers: {[string]: Reducer<*, *>}) => combineReducers({
  ...libraryReducers,
  
  navigation,
})

export {createRootReducer}
