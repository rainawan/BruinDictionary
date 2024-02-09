import useCurrentUserData from '../utils/useCurrentUserData';
import SignInButton from '../SignInButton';
import SignOutButton from '../SignOutButton';
import Login from './Login';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AuthInfo from './AuthInfo';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Home = () => {
  const { userData, setUserData } = useCurrentUserData();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData({ username: user.displayName, email: user.email, userid: user.uid });
    } else {
      setUserData(undefined);
    }
  });
  return (
    <div>
      <p>Name: {userData?.username ?? 'None'}</p>
      HOME
    </div>
  );
};

export default Home;
