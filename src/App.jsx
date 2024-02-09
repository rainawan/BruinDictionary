import useCurrentUserData from './utils/useCurrentUserData';
import './App.css';

function App() {
  const { userData, setUserData } = useCurrentUserData();

  return (
    <div className="App">
      <button
        onClick={() => {
          setUserData({ username: 'John Doe' });
        }}>
        {userData?.username ?? 'click to update user name'}
      </button>
    </div>
  );
}

export default App;
