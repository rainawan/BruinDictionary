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

  const boldText = () => {
    return <p>hi</p>;
  };

  return (
    <section className="Login">
      <div className="grid grid-cols-10">
        {/* left-side div */}
        <div className="col-span-10 sm:col-span-5 lg:col-span-3  p-5 rounded">
          <ProfilePicture></ProfilePicture>

          <div className="m-auto text-white flex items-stretch flex-col">
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
        <div className="col-span-10 sm:col-span-5 lg:col-span-7  p-5 rounded text-center">
          <Posts></Posts>
        </div>
      </div>
    </section>
  );
};

export default Profile;
