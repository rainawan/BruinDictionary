import { useNavigate } from 'react-router-dom';
import useCurrentUserData from '../utils/useCurrentUserData';
import UserSignUp from '../pages/SignUp';

const Create = () => {
  const navigate = useNavigate();
  const { userData } = useCurrentUserData();

  if (userData) {
    navigate('/user');
    return;
  }

  return <UserSignUp />;
};

export default Create;
