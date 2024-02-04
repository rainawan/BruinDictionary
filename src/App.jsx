import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
      </Route>
    </Routes>
  );
}

export default App;
