import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';

const GoogleSignIn = () => {
  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return <button onClick={userSignIn}>Continue With Google</button>;
};

export default GoogleSignIn;