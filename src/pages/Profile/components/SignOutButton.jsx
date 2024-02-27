import { signOut } from 'firebase/auth';
import { Button } from '@nextui-org/react';
import { auth } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <Button color="primary" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
