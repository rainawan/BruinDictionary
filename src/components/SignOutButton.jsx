import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Button } from '@nextui-org/react';

const SignOutButton = () => {
  const userSignOut = () => {
    signOut(auth);
  };

  return (
    <Button color="primary" size="sm" onClick={userSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
