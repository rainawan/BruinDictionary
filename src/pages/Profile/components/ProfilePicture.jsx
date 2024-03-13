import { Card, Skeleton, Image } from '@nextui-org/react';
import useCurrentUserData from '../../../utils/useCurrentUserData';

const ProfilePicture = () => {
  const { userData } = useCurrentUserData();

  const photo = userData.photo;

  return <img className="object-fill object-center rounded-full" src={photo}></img>;
};

export default ProfilePicture;
