import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';

const SignInButton = () => {
  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return <button onClick={userSignIn}>Continue With Google</button>;
};

export default SignInButton;
