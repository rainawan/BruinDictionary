import { Navigate } from 'react-router-dom';
import useCurrentUserData from '../utils/useCurrentUserData';
import AddPage from '../pages/Add/Add';

const Add = () => {
  const { userData } = useCurrentUserData();

  if (userData) {
    return <AddPage />;
  }
  return <Navigate to="/" />;
};

export default Add;
