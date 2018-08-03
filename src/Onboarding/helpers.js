// @flow
import * as firebase from 'firebase';

import type { UserInformation } from 'parcley';

export type LoginValues = {
  email: string,
  password: string,
};
export type RegisterValues = {
  email: string,
  username: string,
  password: string,
};

export const isUserUnique = async (userInfo: UserInformation) => {
  const usersRef = await firebase.firestore().collection('users');

  const isEmpty = usersRef
    .where('username', '==', userInfo.username)
    .limit(1)
    .get()
    .then(snapshot => snapshot.empty);
  return isEmpty;
};

export const readUserInfo = (userId: string) =>
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(snapshot => snapshot.data());

export const writeUserInfo = (userInfo: UserInformation) =>
  firebase
    .firestore()
    .collection('users')
    .doc(userInfo.uid)
    .set(userInfo);

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterValues) => {
  const isUnique = await isUserUnique({ username, email, uid: '' });
  if (!isUnique) {
    throw new Error('Username already taken');
  }

  await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user = firebase.auth().currentUser;

  const userInformation = {
    username: username,
    email: email,
    uid: user.uid,
    joinedMatches: {},
  };
  await writeUserInfo(userInformation);
};

export const login = ({ email, password }: LoginValues) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logout = () => firebase.auth().signOut();
