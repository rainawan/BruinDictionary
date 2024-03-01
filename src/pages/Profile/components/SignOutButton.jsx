import { signOut } from 'firebase/auth';
import { Button } from '@nextui-org/react';
import { auth } from '../../../utils/firebase';

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Button color="primary" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
