// @flow
import type { Reducer } from 'redux';
import type { Id, Order, UserInformation } from 'parcley';
import type { DataReducerActions } from './actions';
import { actionTypes } from './actions';
import { setIn, shallowMerge } from 'fnional';

type State = {
  pending: boolean,
  orders: { [Id]: Order },
  users: { [Id]: UserInformation },
};
const initialState = {
  pending: false,
  orders: {},
  users: {},
};

const reducer: Reducer<State, DataReducerActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.SET_PENDING:
      return setIn(state, 'pending', action.payload);
    case actionTypes.SET_ORDERS:
      return setIn(state, 'orders', shallowMerge(state.orders, action.payload));
    case actionTypes.SET_USERS:
      return setIn(state, 'users', shallowMerge(state.users, action.payload));
    default:
      return state;
  }
};

export { reducer, initialState };
export type { State };
