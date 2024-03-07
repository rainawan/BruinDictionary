import { Card, Skeleton, Image } from '@nextui-org/react';
import useCurrentUserData from '../../../utils/useCurrentUserData';

const ProfilePicture = () => {
  const { userData } = useCurrentUserData();

  return (
    <div className="relative inline-flex items-center justify-center w-80 h-80 overflow-hidden bg-gray-100 rounded-full dark:bg-black">
      <span className="font-medium text-gray-600 dark:text-gray-300">{userData.username}</span>
      {/* <Image src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></Image> */}
    </div>
  );
};

export default ProfilePicture;
