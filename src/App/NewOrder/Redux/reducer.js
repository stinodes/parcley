// @flow
import type { Reducer } from 'redux';
import type { ReducerAction } from './actions';
import { actionTypes } from './actions';
import { setIn } from 'fnional';

type State = {|
  isPending: boolean,
  isSuccessful: boolean,
|};
const initialState: State = {
  isPending: false,
  isSuccessful: false,
};

const reducer: Reducer<State, ReducerAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.SET_IS_PENDING:
      return setIn(state, 'isPending', action.payload);
    case actionTypes.SET_IS_SUCCESSFUL:
      return setIn(state, 'isSuccessful', action.payload);
    default:
      return state;
  }
};

export { reducer };
export type { State };
