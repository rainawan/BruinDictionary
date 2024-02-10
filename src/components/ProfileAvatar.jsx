import { Avatar } from '@nextui-org/react';
import { UserOutlined } from '@ant-design/icons';
import useCurrentUserData from '../utils/useCurrentUserData';

const ProfileAvatar = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return (
      <Avatar
        as="button"
        name={userData.username}
        size="sm"
        color="warning"
        className="transition-transform"
      />
    );
  }

  return (
    <Avatar
      as="button"
      icon={<UserOutlined className="text-base" />}
      size="sm"
      color="warning"
      className="transition-transform"
    />
  );
};

export default ProfileAvatar;
