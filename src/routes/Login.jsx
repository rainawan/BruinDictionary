import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';
import SignInButton from '../components/SignInButton';
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
  }, [auth]);

  return (
    <section className="Login">
      <p>Name: {userData?.username ?? 'None'}</p>
      <SignInButton></SignInButton>
      <SignOutButton></SignOutButton>
    </section>
  );
};

export default Login;
