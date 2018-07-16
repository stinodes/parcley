// @flow
import * as firebase from 'firebase'

import type {UserInformation, Match, Id} from 'coolio'

export const uidForUsername = async (username: string) => {
  const userIds = await firebase.firestore()
    .collection('users')
    .where('username', '==', username)
    .limit(1)
    .get()
    .then(
      snapshot => snapshot.docs
        .map(doc => doc.data().uid)
    )
  
  return userIds[0]
  
}

export const readUserInfo = async (userId: Id): Promise<UserInformation> => {
  console.log('fetching user',  userId)
  return await firebase.firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => doc.data())
}

export const matchExists = async (uid: Id) =>
  firebase.firestore()
    .collection('matches')
    .doc(uid)
    .get()
    .then(doc => doc.exists)
export const readMatch = async (uid: Id) =>
  firebase.firestore()
    .collection('matches')
    .doc(uid)
    .get()
    .then(doc => doc.data())

export const readMatches = async () => {
  const db = firebase.firestore()
  const user = firebase.auth().currentUser
  
  const userInfo: UserInformation = await db.collection('users')
    .doc(user.uid)
    .get()
    .then(doc => doc.data())
  
  const joinedMatchesId = userInfo.joinedMatches ? Object.keys(userInfo.joinedMatches) : []
  
  console.log(joinedMatchesId)
  
  const joinedMatches = await Promise.all(
    joinedMatchesId.map(readMatch)
  )
  const joinedMatchesMap = joinedMatches.reduce((prev, match) => ({...prev, [match.uid]: match}), {})
  return joinedMatchesMap
}

export const addMatchToUser = (userUid: Id, matchUid: Id) =>
  firebase.firestore()
    .collection('users')
    .doc(userUid)
    .update(`joinedMatches.${matchUid}`, true)

export const createMatch = async (match: Match) => {
  const uid = match.name.replace(' ', '_').toLowerCase()
  const exists = await matchExists(uid)
  if (exists)
    throw new Error('Match already exists')
  
  const matchWithUid = {...match, uid}
  
  await firebase.firestore().collection('matches')
    .doc(uid)
    .set(matchWithUid)
  
  return matchWithUid
}
