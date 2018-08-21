// @flow
import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import randomWords from 'random-words';

import type {
  UserInformation,
  Order,
  Id,
  Member,
  ThrowableRead,
} from 'parcley';
import { createReadError, toEntityMap } from '../Utils';

export const uidForUsername = async (username: string) => {
  const userIds = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .limit(1)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().uid));

  return userIds[0];
};

export const uidForOrderCode = async (code: string) => {
  const orderIds = await firebase
    .firestore()
    .collection('orders')
    .where('code', '==', code)
    .limit(1)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().uid));

  return orderIds[0];
};

export const generateOrderCode = async (numOfWords?: number = 4) => {
  const code = randomWords({ exactly: numOfWords, join: ' ' });
  const result = await uidForOrderCode(code);
  if (!result) return code;
  return generateOrderCode(numOfWords);
};

export const readUserInfo = async (userId: Id): Promise<UserInformation> => {
  const firestore = firebase.firestore();
  const userDoc = firestore.collection('users').doc(userId);
  const userInfo = await userDoc.get().then(doc => doc.data());
  const joinedOrders = await userDoc
    .collection('orders')
    .where('joined', '==', true)
    .get()
    .then(snapshot =>
      snapshot.docs
        .filter(doc => doc.data().joined)
        .reduce((prev, doc) => ({ ...prev, [doc.id]: true }), {}),
    );
  return { ...userInfo, joinedOrders };
};

export const orderExists = async (uid: Id) =>
  firebase
    .firestore()
    .collection('orders')
    .where('uid', '==', uid)
    .get()
    .then(snapshot => !snapshot.empty);

export const readOrder = async (uid: Id): Promise<ThrowableRead<Order>> => {
  const firestore = firebase.firestore();
  const orderDoc = firestore.collection('orders').doc(uid);
  const order = await orderDoc.get().then(doc => doc.data());

  if (!order) return createReadError(uid);

  const members = await orderDoc
    .collection('members')
    .orderBy('username', 'desc')
    .get()
    .then(snapshot =>
      snapshot.docs.reduce(
        (prev, doc) => ({ ...prev, [doc.id]: doc.data() }),
        {},
      ),
    );
  console.log('members', members);
  return { ...order, members };
};

export const addOrderToUser = (userUid: Id, orderUid: Id) =>
  firebase
    .firestore()
    .collection('users')
    .doc(userUid)
    .collection('orders')
    .doc(orderUid)
    .set({ joined: true });
export const removeOrderFromUser = (userUid: Id, orderUid: Id) =>
  firebase
    .firestore()
    .collection('users')
    .doc(userUid)
    .collection('orders')
    .doc(orderUid)
    .delete();

export const joinOrder = async (orderUid: Id, member: Member) =>
  firebase
    .firestore()
    .collection('orders')
    .doc(orderUid)
    .collection('members')
    .doc(member.uid)
    .set(member);

export const createOrder = async (order: Order) => {
  const uid = `${order.name
    .split(' ')
    .join('_')
    .toLowerCase()}_${Date.now()}`;
  const exists = await orderExists(uid);
  if (exists) throw new Error('Order already exists');

  const orderWithUid = { ...order, uid };
  await firebase
    .firestore()
    .collection('orders')
    .doc(uid)
    .set(orderWithUid);

  return orderWithUid;
};
