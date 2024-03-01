import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { Button } from '@nextui-org/react';
import Google from '../../../assets/google.svg';

const GoogleSignInButton = () => {
  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return (
    <Button color="default" size="sm" onClick={userSignIn} style={{ padding: '10px' }}>
      <img src={Google} alt="" style={{ width: '20px', height: '20px' }} />
      Continue With Google
    </Button>
  );
};

export default GoogleSignInButton;
