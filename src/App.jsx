import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Add from './routes/Add';
import Home from './routes/Home';
import Login from './routes/Login';
import { db } from '../src/utils/firebase';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Error</div>} />
        </Route>
      </Routes>
      <>
        <h1>Bruin Dictionary</h1>

        <section className="add-entry">
          <h2>Add New Entry</h2>
          <div className="text-box">
            <div className="text-box-item">
              <select id="term-select"></select>
            </div>
            <div className="text-box-item">
              <input className="definition-text-box" placeholder="Example" />
            </div>
            <div className="text-box-item">
              <textarea className="example-text-box" placeholder="Definition goes here..." />
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default App;
