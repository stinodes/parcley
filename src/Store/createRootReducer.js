// @flow
import {combineReducers} from 'redux'

import {reducer as navigation} from '../Navigation'
import {reducer as keyboard} from '../Components/Keyboard/Redux'

import type {Reducer} from 'redux'

const createRootReducer = (libraryReducers: {[string]: Reducer<*, *>}) => combineReducers({
  ...libraryReducers,
  
  keyboard,
  navigation,
})

export {createRootReducer}
