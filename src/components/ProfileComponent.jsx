import ProfileAvatar from '../components/ProfileAvatar';
import SignOutButton from './SignOutButton';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import useCurrentUserData from '../utils/useCurrentUserData';
const Profile = () => {
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
    <div className="Login">
      <h1>Profile Page</h1>
      <ProfileAvatar></ProfileAvatar>
      <p>Name: {userData?.username ?? 'None'}</p>
      <p>Email: {userData?.email ?? 'None'}</p>
      <SignOutButton></SignOutButton>
    </div>
  );
};

export default Profile;
