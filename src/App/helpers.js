// @flow
import * as firebase from 'firebase'
import randomWords from 'random-words'

import type {UserInformation, Order, Id, Member} from 'parcley'
import {toEntityMap} from '../Utils'

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

export const uidForOrderCode = async (code: string) => {
  const orderIds = await firebase.firestore()
    .collection('orders')
    .where('code', '==', code)
    .limit(1)
    .get()
    .then(
      snapshot => snapshot.docs
        .map(doc => doc.data().uid)
    )
  
  return orderIds[0]
}

export const generateOrderCode = async (numOfWords?: number = 4) => {
  const code = randomWords({exactly: numOfWords, join: ' '})
  const result = await uidForOrderCode(code)
  if (!result)
    return code
  return generateOrderCode(numOfWords)
}

export const readUserInfo = async (userId: Id): Promise<UserInformation> => {
  console.log('fetching user',  userId)
  return await firebase.firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => doc.data())
}

export const orderExists = async (uid: Id) =>
  firebase.firestore()
    .collection('orders')
    .doc(uid)
    .get()
    .then(doc => doc.exists)

export const readOrder = async (uid: Id) =>
  firebase.firestore()
    .collection('orders')
    .doc(uid)
    .get()
    .then(doc => doc.data())

export const readOrders = async () => {
  const db = firebase.firestore()
  const user = firebase.auth().currentUser
  
  const userInfo: UserInformation = await db.collection('users')
    .doc(user.uid)
    .get()
    .then(doc => doc.data())
  
  const joinedOrdersId = userInfo.joinedOrders ? Object.keys(userInfo.joinedOrders) : []
  
  console.log(joinedOrdersId)
  
  const joinedOrders = await Promise.all(
    joinedOrdersId.map(readOrder)
  )
  return toEntityMap(joinedOrders)
}

export const addOrderToUser = (userUid: Id, orderUid: Id) =>
  firebase.firestore()
    .collection('users')
    .doc(userUid)
    .update(`joinedOrders.${orderUid}`, true)

export const joinOrder = async (orderUid: Id, member: Member) =>
  firebase.firestore()
    .collection('orders')
    .doc(orderUid)
    .update(`members.${member.uid}`, member)

export const createOrder = async (order: Order) => {
  const uid = `${order.name.split(' ').join('_').toLowerCase()}_${Date.now()}`
  const exists = await orderExists(uid)
  if (exists)
    throw new Error('Order already exists')
  
  const orderWithUid = {...order, uid}
  
  await firebase.firestore().collection('orders')
    .doc(uid)
    .set(orderWithUid)
  
  return orderWithUid
}
