// @flow
import type {
  Order,
  UserInformation,
  Id,
  FriendInformation,
  Member,
} from 'parcley';

export const actionTypes: {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  FETCH_FRIENDS: 'Data/FETCH_FRIENDS',
  FETCH_ORDERS: 'Data/FETCH_ORDERS',
  SET_ORDERS: 'Data/SET_ORDERS',
  SET_USERS: 'Data/SET_USERS',
  SET_FRIENDS: 'Data/SET_FRIENDS',
  SET_MEMBERS: 'Data/SET_MEMBERS',
} = {
  SET_PENDING: 'Data/SET_PENDING',
  FETCH_ALL_DATA: 'Data/FETCH_ALL_DATA',
  FETCH_FRIENDS: 'Data/FETCH_FRIENDS',
  FETCH_ORDERS: 'Data/FETCH_ORDERS',
  SET_ORDERS: 'Data/SET_ORDERS',
  SET_USERS: 'Data/SET_USERS',
  SET_FRIENDS: 'Data/SET_FRIENDS',
  SET_MEMBERS: 'Data/SET_MEMBERS',
};

type DataAction<Type: $Values<typeof actionTypes>, Payload = void> = Action<
  Type,
  Payload,
>;
type FetchAllData = DataAction<typeof actionTypes.FETCH_ALL_DATA>;
type FetchOrders = DataAction<typeof actionTypes.FETCH_ORDERS>;
type FetchFriends = DataAction<typeof actionTypes.FETCH_FRIENDS>;
type SetPending = DataAction<typeof actionTypes.SET_PENDING, boolean>;
type SetOrders = DataAction<typeof actionTypes.SET_ORDERS, { [Id]: Order }>;
type SetUsers = DataAction<
  typeof actionTypes.SET_USERS,
  { [Id]: UserInformation },
>;
type SetFriends = DataAction<
  typeof actionTypes.SET_FRIENDS,
  { [Id]: FriendInformation },
>;
type SetMembers = DataAction<
  typeof actionTypes.SET_MEMBERS,
  { [Id]: { [Id]: FriendInformation } },
>;
export type DataReducerActions =
  | SetPending
  | SetOrders
  | SetUsers
  | SetFriends
  | SetMembers;

export const setPending = (pending: boolean): SetPending => ({
  type: actionTypes.SET_PENDING,
  payload: pending,
});
export const fetchAllData = (): FetchAllData => ({
  type: actionTypes.FETCH_ALL_DATA,
  payload: undefined,
});
export const fetchOrders = (): FetchOrders => ({
  type: actionTypes.FETCH_ORDERS,
  payload: undefined,
});
export const fetchFriends = (): FetchFriends => ({
  type: actionTypes.FETCH_FRIENDS,
  payload: undefined,
});
export const setOrder = (order: Order): SetOrders => ({
  type: actionTypes.SET_ORDERS,
  payload: { [order.uid]: order },
});
export const setOrders = (orders: { [Id]: Order }): SetOrders => ({
  type: actionTypes.SET_ORDERS,
  payload: orders,
});
export const setMember = (orderUid: Id, member: Member): SetMembers => ({
  type: actionTypes.SET_MEMBERS,
  meta: { orderUid },
  payload: { [orderUid]: { [member.uid]: member } },
});
export const setMembers = (
  orderUid: Id,
  members: { [Id]: Member },
): SetMembers => ({
  type: actionTypes.SET_MEMBERS,
  meta: { orderUid },
  payload: { [orderUid]: members },
});
export const setUser = (user: UserInformation): SetUsers => ({
  type: actionTypes.SET_USERS,
  payload: { [user.uid]: user },
});
export const setUsers = (users: { [Id]: UserInformation }): SetUsers => ({
  type: actionTypes.SET_USERS,
  payload: users,
});
export const setFriend = (friend: FriendInformation): SetFriends => ({
  type: actionTypes.SET_FRIENDS,
  payload: { [friend.uid]: friend },
});
export const setFriends = (friends: {
  [Id]: FriendInformation,
}): SetFriends => ({
  type: actionTypes.SET_FRIENDS,
  payload: friends,
});
