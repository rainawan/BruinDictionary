import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config.js';
export default function SignInButton() {
  const userSignIn = async (e, user) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return <button onClick={userSignIn}>Sign In</button>;
}
