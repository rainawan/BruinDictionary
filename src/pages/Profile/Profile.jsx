import useCurrentUserData from '../../utils/useCurrentUserData';
import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from './components/SignOutButton';

const Profile = () => {
  const { userData } = useCurrentUserData();

  return (
    <section className="Login">
      <div className="mx-auto text-white text-center place-content-center flex items-stretch flex-col">
        <div className="mx-auto w-full p-2 place-content-center flex">
          <ProfileAvatar className="self-center " />
        </div>
        <p>Name: {userData?.username ?? 'None'}</p>
        <p>Email: {userData?.email ?? 'None'}</p>
        <p>Date Joined: {userData?.date ?? 'None'}</p>
      </div>
      <SignOutButton />
    </section>
  );
};

export default Profile;
