import { Avatar } from '@nextui-org/react';
import { UserOutlined } from '@ant-design/icons';
import useCurrentUserData from '../utils/useCurrentUserData';

const ProfileAvatar = () => {
  const { userData } = useCurrentUserData();

  if (!userData) {
    return (
      <Avatar
        as="button"
        size="sm"
        className="dark:bg-gray-500 hover:scale-110 transition-transform"
        icon={<UserOutlined className="text-base" />}
      />
    );
  }
  return (
    <Avatar
      as="button"
      name={userData.username}
      size="sm"
      color="warning"
      className="hover:scale-110 transition-transform"
    />
  );
};

export default ProfileAvatar;
