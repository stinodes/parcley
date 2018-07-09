// @flow
import * as firebase from 'firebase'

export type RegisterValues = {
  email: string,
  username: string,
  password: string,
}
export type UserInformation = {
  username: string,
  uid: string,
  email: string,
}

export const isUserUnique = async (userInfo: UserInformation) => {
  const snapshot = await firebase.database().ref('users')
    .orderByChild('username')
    .equalTo(userInfo.username)
    .once('value')
  return snapshot.exists()
}

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
