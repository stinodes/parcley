// @flow
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
import randomWords from "random-words";

import type {
  UserInformation,
  Order,
  Id,
  Member,
  ThrowableRead
} from "parcley";
import { createReadError, toEntityMap } from "../Utils";

export const uidForUsername = async (username: string) => {
  const userIds = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().uid));

  return userIds[0];
};

export const uidForOrderCode = async (code: string) => {
  const orderIds = await firebase
    .firestore()
    .collection("orders")
    .where("code", "==", code)
    .limit(1)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().uid));

  return orderIds[0];
};

export const generateOrderCode = async (numOfWords?: number = 4) => {
  const code = randomWords({ exactly: numOfWords, join: " " });
  const result = await uidForOrderCode(code);
  if (!result) return code;
  return generateOrderCode(numOfWords);
};

export const readUserInfo = async (userId: Id): Promise<UserInformation> =>
  firebase
    .firestore()
    .doc(`users/${userId}`)
    .get()
    .then(doc => doc.data());

export const readFriends = async (userId: Id) =>
  firebase
    .firestore()
    .collection(`users/${userId}/friends`)
    // .where('rankIndex', '>', 0)
    .orderBy("rankIndex", "asc")
    .get()
    .then(snapshot => snapshot.docs.data());
export const addFriend = (userId: Id, friendId: Id) =>
  firebase
    .firestore()
    .doc(`users/${userId}/friends/${friendId}`)
    .set({
      friend: true,
      rankIndex: 0,
      rank: "buds",
      uid: friendId
    });
export const deleteFriend = (userId: Id, friendId: Id) =>
  console.log(`users/${userId}/friends/${friendId}`) ||
  firebase
    .firestore()
    .doc(`users/${userId}/friends/${friendId}`)
    .update({ friend: false });
export const orderExists = async (uid: Id) =>
  firebase
    .firestore()
    .collection("orders")
    .where("uid", "==", uid)
    .get()
    .then(snapshot => !snapshot.empty);
export const readOrder = (uid: Id) =>
  firebase
    .firestore()
    .doc(`orders/${uid}`)
    .get()
    .then(doc => doc.data());
export const readOrderAndMembers = async (
  uid: Id
): Promise<ThrowableRead<Order>> => {
  const firestore = firebase.firestore();
  const orderDoc = firestore.collection("orders").doc(uid);
  const order = await orderDoc.get().then(doc => doc.data());

  if (!order) return createReadError(uid);

  const members = await orderDoc
    .collection("members")
    .orderBy("username", "desc")
    .get()
    .then(snapshot =>
      snapshot.docs.reduce(
        (prev, doc) => ({ ...prev, [doc.id]: doc.data() }),
        {}
      )
    );
  return { ...order, members };
};
export const setQuantityOnOrder = (
  orderUid: Id,
  userUid: Id,
  quantity: number
) =>
  firebase
    .firestore()
    .doc(`orders/${orderUid}/members/${userUid}`)
    .update({ quantity });
export const addOrderToUser = (userUid: Id, orderUid: Id) =>
  firebase
    .firestore()
    .doc(`users/${userUid}/orders/${orderUid}`)
    .set({ joined: true });
export const removeOrderFromUser = (userUid: Id, orderUid: Id) =>
  firebase
    .firestore()
    .doc(`users/${userUid}/orders/${orderUid}`)
    .delete();

export const joinOrder = async (orderUid: Id, member: Member) =>
  firebase
    .firestore()
    .doc(`orders/${orderUid}/members/${member.uid}`)
    .set(member);

export const createOrder = async (order: Order) => {
  const uid = `${order.name
    .split(" ")
    .join("_")
    .toLowerCase()}_${Date.now()}`;
  const exists = await orderExists(uid);
  if (exists) throw new Error("Order already exists");

  const orderWithUid = { ...order, uid };
  await firebase
    .firestore()
    .doc(`orders/${uid}`)
    .set(orderWithUid);

  return orderWithUid;
};
