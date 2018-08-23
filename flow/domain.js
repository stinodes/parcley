// @flow
declare module 'parcley' {
  declare export interface ReadError<Data = Id> {
    error: true;
    data: Data;
  }

  declare export type ThrowableRead<Entity, Data = Id> = Entity | ReadError<Id>;

  declare export type Id = string;
  declare export type Score = ?number;
  declare export type FriendRank = 'just buds' | 'good pals' | 'best mates';

  declare export type UserInformation = {
    email: string,
    username: string,
    uid: Id,
  };
  declare export type FriendInformation = {
    friend: boolean,
    rankIndex: number,
    rank: FriendRank,
    uid: Id,
  };
  declare export type Unsynced<Type> = $Diff<Type, { uid: Id }>;
  declare export type Member = {
    score: Score,
    username: string,
    uid: string,
  };
  declare export type Order = {
    uid: Id,
    host: Id,
    name: string,
    code: string,
    description: string,
    startedOn: number,
    isPrivate: boolean,
  };
}
