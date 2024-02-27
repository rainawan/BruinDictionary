import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Add from './routes/Add';
import Home from './routes/Home';
import User from './routes/User';

import './App.css';

function App() {
  const onAddEntry = async (communityId, selected) => {
    console.log(selected);
  };

  return (
    <div className="App dark:dark">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="*" element={<div>404: Error</div>} />
      </Routes>
      <>
        {/* This will be an admin only section once we add authorization */}
        <section className="add-entry">
          <h2>Add New Entry</h2>
          <div className="text-box">
            <div className="text-box-item">
              <select id="term-select">
                {/* {terms &&
                  Object.keys(terms).map((key) => (
                    <option key={key} value={terms[key]}>
                      {terms[key]}
                    </option>
                  ))} */}
              </select>
            </div>
            <div className="text-box-item">
              <input className="definition-text-box" placeholder="Example" />
            </div>
            <div className="text-box-item">
              <textarea className="example-text-box" placeholder="Definition goes here..." />
            </div>
            <button onClick={onAddEntry}>Add Entry</button>
          </div>
        </section>
      </>
    </div>
  );
}

export default App;
