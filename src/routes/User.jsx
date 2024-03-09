import useCurrentUserData from '../utils/useCurrentUserData';
import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';

const User = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return <Profile />;
  } else {
    return <SignIn />;
  }
};

export default User;
