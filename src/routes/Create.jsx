import { Navigate } from 'react-router-dom';
import useCurrentUserData from '../utils/useCurrentUserData';
import UserSignUp from '../pages/SignUp/UserSignUp.jsx';

const Create = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return <Navigate to="/user" />;
  } else {
    return <UserSignUp />;
  }
};

export default Create;
