// @flow
import { Main } from '../index'

import type { Reducer } from 'redux'

const reducer : Reducer<*, *> = (state, action) => {

  // if (action.meta && action.meta.reset) {
  //   return Main.router.getStateForAction(action) || state
  // }

  const newState = Main.router.getStateForAction(action, state)
  return newState || state
}

export default reducer
