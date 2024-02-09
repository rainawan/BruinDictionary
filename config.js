import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBOTI15w1U5rJqX_cBZ8J-qa1Wb475klAo',
  authDomain: 'bruindictionary.firebaseapp.com',
  databaseURL: 'https://bruindictionary-default-rtdb.firebaseio.com',
  projectId: 'bruindictionary',
  storageBucket: 'bruindictionary.appspot.com',
  messagingSenderId: '738006961696',
  appId: '1:738006961696:web:382c38baf994f013b53645',
  measurementId: 'G-109P7XELC8'
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
