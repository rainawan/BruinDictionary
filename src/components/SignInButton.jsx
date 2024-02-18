import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Button } from '@nextui-org/react';

const SignInButton = () => {
  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Button color="primary" size="sm" onClick={userSignIn}>
      Sign In
    </Button>
  );
};

export default SignInButton;
