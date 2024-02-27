import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate('/');
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
