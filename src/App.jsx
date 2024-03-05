import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Add from './routes/Add';
import Home from './routes/Home';
import User from './routes/User';

import './App.css';
import Create from './routes/Create.jsx';

function App() {
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
    </div>
  );
}

export default App;
