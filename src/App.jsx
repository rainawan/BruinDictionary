import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { Toaster } from 'sonner';
import { auth } from './utils/firebase';
import useCurrentUserData from './utils/useCurrentUserData';
import Navbar from './components/Navbar';
import Add from './routes/Add';
import Home from './routes/Home';
import User from './routes/User';
import Create from './routes/Create';
import './App.css';
import BlueBear from './assets/blue_bear.png';
import YellowBear from './assets/yellow_bear.png';
import GreenBear from './assets/green_bear.png';
import RedBear from './assets/red_bear.png';

function App() {
  const { setUserData } = useCurrentUserData();

  const bearPhotos = [BlueBear, GreenBear, RedBear, YellowBear];

  const randomPhoto = bearPhotos[Math.floor(Math.random() * bearPhotos.length)];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.photoURL === null) {
          updateProfile(auth.currentUser, {
            photoURL: randomPhoto
          });
        }
        console.log("user's photo: ", user.photoURL);
        setUserData({
          username: user.displayName,
          email: user.email,
          userid: user.uid,
          photo: user.photoURL ?? randomPhoto
        });

        console.log("user's new photo: ", user.photoURL);
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
