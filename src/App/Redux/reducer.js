// @flow
import type { Reducer } from 'redux';
import type {
  Id,
  Order,
  Member,
  UserInformation,
  FriendInformation,
} from 'parcley';
import type { DataReducerActions } from './actions';
import { actionTypes } from './actions';
import { setIn, shallowMerge } from 'fnional';

type State = {
  pending: boolean,
  orders: { [Id]: Order },
  members: { [Id]: { [Id]: Member } },
  users: { [Id]: UserInformation },
  friends: { [Id]: FriendInformation },
};
const initialState: State = {
  pending: false,
  orders: {},
  members: {},
  users: {},
  friends: {},
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
    case actionTypes.SET_FRIENDS:
      return setIn(
        state,
        'friends',
        shallowMerge(state.friends, action.payload),
      );
    case actionTypes.SET_MEMBERS:
      const orderUid: ?string =
        action.meta &&
        typeof action.meta === 'object' &&
        typeof action.meta.orderUid === 'string'
          ? action.meta.orderUid
          : null;
      if (!orderUid) return state;
      return setIn(
        state,
        'members',
        setIn(state.members, orderUid, action.payload[orderUid]),
      );
    default:
      return state;
  }
};

export { reducer, initialState };
export type { State };
