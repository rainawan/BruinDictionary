import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'sonner';
import { auth } from './utils/firebase';
import useCurrentUserData from './utils/useCurrentUserData';
import Navbar from './components/Navbar';
import Add from './routes/Add';
import Home from './routes/Home';
import User from './routes/User';
import Create from './routes/Create';
import './App.css';

function App() {
  const { setUserData } = useCurrentUserData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          username: user.displayName,
          email: user.email,
          userid: user.uid,
          photo: user.photoURL
        });
      } else {
        setUserData(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App dark:dark">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/create" element={<Create />} />
          <Route path="*" element={<div>404: Error</div>} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" richColors closeButton />
    </div>
  );
}

export default App;
