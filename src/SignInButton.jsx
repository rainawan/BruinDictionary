import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './utils/firebase';
const SignInButton = () => {
  const userSignIn = (e) => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return <button onClick={userSignIn}>Sign In</button>;
};

export default SignInButton;
