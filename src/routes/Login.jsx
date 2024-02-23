import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';
import SignIn from '../components/UserSignIn';
import SignUp from '../components/UserSignUp';
import GoogleSignIn from '../components/GoogleSignIn';
import SignOutButton from '../components/SignOutButton';

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

  return (
    <div className="Login">
      <h1>Log In</h1>
      <p>Name: {userData?.username ?? 'None'}</p>
      <p>Email: {userData?.email ?? 'None'}</p>
      <GoogleSignIn></GoogleSignIn>
      <SignOutButton></SignOutButton>
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  );
};

export default Login;
