import { collection, query, where, getDocs, terminate } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import db from '../src/utils/firebase';

function App() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState([]);
  const [terms, setTerms] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const querySnapshot = await getDocs(collection(db.db, 'Entries'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setEntries([...entries, { id: doc.id, ...doc.data() }]);
      });
    }
    fetchEntries();
  }, []);

  useEffect(() => {
    async function fetchTerms() {
      const querySnapshot = await getDocs(collection(db.db, 'Terms'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setTerms({...terms, [doc.id]: doc.data().name});
      });
    }
    fetchTerms();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const querySnapshot = await getDocs(collection(db.db, 'Users'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setUsers([...users, { id: doc.id, ...doc.data() }]);
      });
    }
  }, []);
  console.log(entries);
  return (
    <>
      <h1>Bruin Dictionary</h1>
      {entries.map((entry, index) => (
        <div key={index}>
          <h2>{terms[entry.termid]}</h2>
          <p>{entry.example}</p>
        </div>
      ))}
      <h2>Add New Entry</h2>
      <div className="text-box">
        <select id='term-select'>
          {Object.keys(terms).map(key => <option key={key} value={terms[key]}>{terms[key]}</option>)}
        </select>
        <input className="example-text-box" />
        <textarea className="example-text-box" />
        <button>Add Entry</button>
      </div>
    </>
  );
}

export default App;
