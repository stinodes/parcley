// @flow
import * as firebase from 'firebase'

import type {UserInformation} from 'coolio'

export type LoginValues = {
  email: string,
  password: string,
}
export type RegisterValues = {
  email: string,
  username: string,
  password: string,
}

export const isUserUnique = async (userInfo: UserInformation) => {
  const snapshot = await firebase.database().ref('users')
    .orderByChild('username')
    .equalTo(userInfo.username)
    .once('value')
  return snapshot.exists()
}

export const readUserInfo = (userId: string) =>
  firebase.database().ref(`users/${userId}`).once('value')

export const writeUserInfo = (userInfo: UserInformation) =>
  firebase.database()
    .ref(`users/${userInfo.uid}`)
    .set(userInfo)

export const registerUser = async ({username, email, password}: RegisterValues) => {
  if (await isUserUnique({username, email, uid: ''})) {
    throw new Error('Username already taken')
  }
  
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  const user = firebase.auth().currentUser
  
  const userInformation = {
    username: username, email: email, uid: user.uid,
  }
  await writeUserInfo(userInformation)
}

export const login = ({email, password}: LoginValues) =>
  firebase.auth()
    .signInWithEmailAndPassword(email, password)

export const logout = () => firebase.auth().signOut()
