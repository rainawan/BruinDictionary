import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import SignInComponent from '../pages/SignIn/SignInComponent';
import ProfileComponent from '../pages/Profile/ProfileComponent';
import useCurrentUserData from '../utils/useCurrentUserData';

const Login = () => {
  const { userData, setUserData } = useCurrentUserData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({ username: user.displayName, email: user.email, userid: user.uid });
      } else {
        setUserData(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  if (userData) {
    return <ProfileComponent />;
  } else {
    return <SignInComponent />;
  }
};

export default Login;
