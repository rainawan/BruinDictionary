import useCurrentUserData from '../utils/useCurrentUserData';
import AddPage from '../pages/Add';
import SignIn from '../pages/SignIn';

const Add = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return <AddPage />;
  }
  return <SignIn />;
};

export default Add;
