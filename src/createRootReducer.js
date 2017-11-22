// @flow
import { combineReducers } from 'redux'

import login from './Login/Redux'
import firebase from './Firebase/Redux'
import mainStack from './Navigation/Redux'

const isKindReset = (action) => {
  return (action.meta && action.meta.location && action.meta.location.kind === 'reset')
}

// const createLocationReducer = (originalReducer) => (state, action) => {
//   let oldState = state
//   let navAction = action
//   if (isKindReset(action)) {
//     navAction = {
//       ...navAction,
//       meta: {...navAction.meta, location: {
//         ...navAction.meta.location,
//         prev: {pathname: '', type: '', payload: {}},
//       }}
//     }
//   }
//   const newState = originalReducer(oldState, navAction)
//   return newState
// }

export default (libraryReducers : {[string]: Function}, pathname : string) =>
  combineReducers({
    ...libraryReducers,
    // location: createLocationReducer(libraryReducers.location),

    login,
    firebase,

    mainStack,
  })