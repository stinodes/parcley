// @flow
import * as firebase from 'firebase'

export const readUserInfo = (userId: string) =>
  firebase.database().ref(`users/${userId}`).once('value')
export const readMatches = () => {
  const user = firebase.auth().currentUser
  return firebase.database().ref(`users/${user.uid}/joinedMatches`).once()
}
