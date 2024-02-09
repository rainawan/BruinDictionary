import { useState } from 'react';
import debounce from 'lodash.debounce';
import useCurrentUserData from '../utils/useCurrentUserData';

const Home = () => {
  const { userData, setUserData } = useCurrentUserData();
  const [searchTerm, setSearchTerm] = useState('haha');

  const handleSearch = (term) => {
    setSearchTerm(() => term);
    debounce(() => {});
  };
  const debouncedSearch = debounce(handleSearch, 500);

  return (
    <div>
      HOME
      <button
        onClick={() => {
          setUserData({ username: 'John Doe' });
        }}>
        {userData?.username ?? 'click to update user name'}
      </button>
      <input type="text" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
};

export default Home;
