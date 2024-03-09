import { Card, Skeleton, Image } from '@nextui-org/react';
import useCurrentUserData from '../../../utils/useCurrentUserData';

const ProfilePicture = () => {
  const { userData } = useCurrentUserData();

  const photo = userData.photo;

  return (
    <div className="flex justify-center w-80 h-80 overflow-hidden bg-gray-100 rounded-full dark:bg-black">
      <img className=" object-fill object-center" src={photo}></img>
    </div>
  );
};

export default ProfilePicture;
