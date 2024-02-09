import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config.js';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

function App() {
  const [count, setCount] = useState(0);
  const [username, setUserName] = useState('[not logged in]');
  const [userEmail, setUserEmail] = useState('[not logged in]');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserName(user.displayName);
      setUserEmail(user.email);
    } else {
      setUserName('[not logged in]');
      setUserEmail('[not logged in]');
    }
  });

  return (
    <>
      <Home></Home>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div>
        <p>
          You have signed in as {username} with the email {userEmail}
        </p>
      </div>
      <SignInButton></SignInButton>
      <SignOutButton></SignOutButton>
    </>
  );
}

export default App;
