import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CurrentUserData = createContext({
  userData: {},
  setUserData: () => {}
});

export const CurrentUserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);

  return (
    <CurrentUserData.Provider value={{ userData, setUserData }}>
      {children}
    </CurrentUserData.Provider>
  );
};

CurrentUserData.propTypes = {
  children: PropTypes.node.isRequired
};
