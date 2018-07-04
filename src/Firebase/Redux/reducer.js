// @flow
import type {User} from 'firebase'
import type {Reducer} from 'redux'
import type {ReducerAction} from './actions'

type State = {
  user: ?User,
}
const initialState: State = {
  user: null,
}
const reducer: Reducer<State, ReducerAction> = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export {reducer}
