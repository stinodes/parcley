// @flow
import * as firebase from 'firebase'

import type {UserInformation, Match} from 'coolio'

export const readUserInfo = async (userId: string): Promise<UserInformation> => {
  const userInfo = await firebase.database().ref(`users/${userId}`).once('value')
  return userInfo.val()
}

export const readMatches = async () => {
  const db = firebase.database()
  const user = firebase.auth().currentUser
  const joinedMatchesIdMapSnapshot = await db.ref(`users/${user.uid}/joinedMatches`).once('value')
  const joinedMatchesIdMap = joinedMatchesIdMapSnapshot.val() || {}
  const joinedMatchesSnapshotArray = await Promise.all(
    Object.keys(joinedMatchesIdMap)
      .filter(id => joinedMatchesIdMap[id])
      .map(id => db.ref(`matches/${id}`).once('value'))
  )
  const joinedMatchesArray: Match[] = joinedMatchesSnapshotArray.map(snapshot => snapshot.val())
  const joinedMatchesMap = joinedMatchesArray.reduce((prev, match) => ({...prev, [match.uid]: match}), {})
  return joinedMatchesMap
}
