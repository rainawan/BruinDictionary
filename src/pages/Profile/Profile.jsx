import useCurrentUserData from '../../utils/useCurrentUserData';
import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from './components/SignOutButton';
import Text from '../../components/Text';
import { Image, Avatar } from '@nextui-org/react';
import DictionaryCard from '../Dictionary/components/DictionaryCard';
import ProfilePicture from './components/ProfilePicture';
import Posts from './components/Posts';
import LoadingCard from '../Dictionary/components/LoadingCard';

const Profile = () => {
  const { userData } = useCurrentUserData();

  return (
    <section className="Profile">
      <div className="flex flex-row">
        {/* left-side div */}
        <div className="flex flex-col justify-center self-start">
          <ProfilePicture></ProfilePicture>

          <div className="m-auto flex flex-col">
            <Text
              h3
              className="font-bold text-blue-800 dark:text-yellow-200 cursor-pointer inline break-all">
              {userData?.username ?? 'None'}
            </Text>
            <Text className="font-bold text-blue-800 dark:text-yellow-200 cursor-pointer inline break-all">
              {userData?.email ?? 'No Email'}
            </Text>
            <p>User since {userData?.date ?? 'MM DD YYYY'}</p>
            <SignOutButton />
          </div>
        </div>

        {/* right-side div */}
        <div className="text-center">
          <Posts></Posts>
        </div>
      </div>
    </section>
  );
};

export default Profile;
