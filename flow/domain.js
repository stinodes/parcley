// @flow
declare module 'coolio' {
  
  declare export type Id = string
  declare export type Score = number
  
  declare export type UserInformation = {
    email: string,
    username: string,
    uid: Id,
    joinedMatches?: {
      [Id]: boolean
    },
  }
  declare export type Unsynced<Type> = $Diff<Type, {uid: Id}>
  declare type Host = {
    uid: string,
    username: string,
  }
  declare export type Member = {
    score: number,
    username: string,
    uid: string,
  }
  declare export type Match = {
    uid: Id,
    host: Id,
    name: string,
    description: string,
    startedOn: number,
    isPrivate: boolean,
    members: {[Id]: Member},
  }
}