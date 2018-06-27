// @flow
import {combineReducers} from 'redux'

import type {Reducer} from 'redux'

const createRootReducer = (libraryReducers: {[string]: Reducer<*, *>}) => combineReducers({
  ...libraryReducers,
  reducer: (state = {}) => state
})

export {createRootReducer}
