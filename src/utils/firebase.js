import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'bruindictionary.firebaseapp.com',
  databaseURL: 'https://bruindictionary-default-rtdb.firebaseio.com',
  projectId: 'bruindictionary',
  storageBucket: 'bruindictionary.appspot.com',
  messagingSenderId: '738006961696',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-109P7XELC8'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
