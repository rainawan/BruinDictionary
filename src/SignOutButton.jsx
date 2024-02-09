import { signOut } from 'firebase/auth';
import { auth } from './utils/firebase';
const SignOutButton = () => {
  const userSignOut = () => {
    signOut(auth);
  };
  return <button onClick={userSignOut}>Sign Out</button>;
};

export default SignOutButton;
