import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config.js';
export default function SignInButton() {
  const userSignOut = async (e) => {
    signOut(auth);
  };
  return <button onClick={userSignOut}>Sign Out</button>;
}
