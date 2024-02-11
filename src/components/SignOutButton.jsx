import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';

const SignOutButton = () => {
  const { userData, setUserData } = useCurrentUserData();

  const userSignOut = () => {
    if (userData) {
      signOut(auth).then(() => {
        setUserData(undefined);
      });
    }
  };

  return <button onClick={userSignOut}>Sign Out</button>;
};

export default SignOutButton;
