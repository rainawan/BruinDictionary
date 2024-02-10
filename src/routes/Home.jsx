import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import Searchbar from '../components/Searchbar';

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
      <Searchbar />
      <p>Name: {userData?.username ?? 'None'}</p>
      <div>
        <SignInButton></SignInButton>
        <SignOutButton></SignOutButton>
      </div>
    </div>
  );
};

export default Home;
