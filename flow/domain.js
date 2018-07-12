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
  
  declare type Host = {
    uid: string,
    username: string,
  }
  declare export type Match = {
    uid: Id,
    host: Host,
    name: string,
    description: string,
    startedOn: number,
    private: boolean,
    scores: {
      [Id]: Score,
    },
    members: {
      [Id]: boolean,
    },
  }
}