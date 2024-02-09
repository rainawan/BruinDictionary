import SearchBar from '../components/SearchBar';
import useCurrentUserData from '../utils/useCurrentUserData';

const Home = () => {
  const { userData, setUserData } = useCurrentUserData();

  return (
    <div>
      <SearchBar />
      <button
        onClick={() => {
          setUserData({ username: 'John Doe' });
        }}>
        {userData?.username ?? 'click to update user name'}
      </button>
    </div>
  );
};

export default Home;
