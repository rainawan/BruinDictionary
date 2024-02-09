import useCurrentUserData from '../utils/useCurrentUserData';

const Home = () => {
  const { userData, setUserData } = useCurrentUserData();

  return (
    <div>
      <button
        onClick={() => {
          setUserData({ username: 'John Doe' });
        }}>
        {userData?.username ?? 'click to update user name'}
      </button>
      HOME
    </div>
  );
};

export default Home;
