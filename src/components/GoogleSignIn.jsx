import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Button } from '@nextui-org/react';

const GoogleSignIn = () => {
  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return (
    <Button color="primary" size="sm" onClick={userSignIn}>
      Continue With Google
    </Button>
  );
};

export default GoogleSignIn;
