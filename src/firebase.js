import firebase from 'firebase';
import { GOOGLE_API_KEY } from './config.js';

const config = {
  apiKey: GOOGLE_API_KEY,
  authDomain: "prioritize-ca259.firebaseapp.com",
  projectId: "prioritize-ca259",
  storageBucket: "prioritize-ca259.appspot.com",
  messagingSenderId: "175679780830",
  appId: "1:175679780830:web:d3b58ee41b7fbf844c8f4f",
  measurementId: "G-N6HE2HR7P4",
  databaseURL: "https://prioritize-ca259-default-rtdb.europe-west1.firebasedatabase.app"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;