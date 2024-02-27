import useCurrentUserData from '../../utils/useCurrentUserData';
import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from './components/SignOutButton';

const Profile = () => {
  const { userData } = useCurrentUserData();

  return (
    <section className="Login">
      <h1>Profile Page</h1>
      <ProfileAvatar />
      <p>Name: {userData?.username ?? 'None'}</p>
      <p>Email: {userData?.email ?? 'None'}</p>
      <SignOutButton />
    </section>
  );
};

export default Profile;
