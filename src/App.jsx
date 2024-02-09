import { Routes, Route } from 'react-router-dom';
import Add from './routes/Add';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Error</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
