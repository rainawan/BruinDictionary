import useCurrentUserData from '../../utils/useCurrentUserData';
import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from './components/SignOutButton';
import Text from '../../components/Text';
import { Image, Avatar } from '@nextui-org/react';

const Profile = () => {
  const { userData } = useCurrentUserData();

  return (
    <section className="Login">
      <div className="mx-auto text-white text-center place-content-center flex items-stretch flex-col">
        <div className="mx-auto w-full p-2 place-content-center flex">
          <Avatar
            as="button"
            name={userData.username}
            size="lg"
            color="warning"
            className="hover:scale-110 transition-transform"
          />
          <div style={{ borderRadius: '5px', overflow: 'hidden' }}></div>
        </div>
        <Text
          h3
          className="font-bold text-blue-800 dark:text-yellow-200 cursor-pointer inline break-all">
          {userData?.username ?? 'None'}
        </Text>

        <Text className="font-bold text-blue-800 dark:text-yellow-200 cursor-pointer inline break-all">
          User since {userData?.date ?? 'MM DD YYYY'}
        </Text>
        <p>{userData?.email ?? 'None'}</p>
      </div>
      <SignOutButton />
    </section>
  );
};

export default Profile;
