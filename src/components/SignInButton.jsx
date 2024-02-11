import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';

const SignInButton = () => {
  const { setUserData } = useCurrentUserData();

  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((user) => {
      setUserData({ username: user.displayName, email: user.email, userid: user.uid });
    });
  };

  return <button onClick={userSignIn}>Sign In</button>;
};

export default SignInButton;
