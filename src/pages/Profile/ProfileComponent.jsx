import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from '../../components/SignOutButton';
import useCurrentUserData from '../../utils/useCurrentUserData';
const Profile = () => {
  const { userData, setUserData } = useCurrentUserData();

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
