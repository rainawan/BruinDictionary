import { Navigate } from 'react-router-dom';
import useCurrentUserData from '../utils/useCurrentUserData';
import SignUp from '../pages/SignUp';

const Create = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return <Navigate to="/user" />;
  }
  return <SignUp />;
};

export default Create;
