import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: process.env.REACT_APP_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_GOOGLE_APP_ID,
  measurementId: process.env.REACT_APP_GOOGLE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_GOOGLE_DATABASE_URL
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;