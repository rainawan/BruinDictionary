import { useContext } from 'react';
import { CurrentUserData } from '../providers/CurrentUserDataProvider';

const useCurrentUserData = () => useContext(CurrentUserData);

export default useCurrentUserData;
