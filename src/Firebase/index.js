// @flow
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDIbjaed8CjPxZsJwUIxE4n3_TzFyAyWjc",
  authDomain: "coolio-58d55.firebaseapp.com",
  databaseURL: "https://coolio-58d55.firebaseio.com",
  projectId: "coolio-58d55",
  storageBucket: "coolio-58d55.appspot.com",
  messagingSenderId: "503306606752"
}
export const setupFirebase = () => firebase.initializeApp(config)
