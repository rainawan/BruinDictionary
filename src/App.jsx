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
  const [entries, setEntries] = useState([]);
  const [terms, setTerms] = useState({});
  const [users, setUsers] = useState([]);
  const [entriesLoaded, setEntriesLoaded] = useState(false);
  const [termsLoaded, setTermsLoaded] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setEntries([]);
      const querySnapshot = await getDocs(collection(db, 'Entries'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setEntries([...entries, { id: doc.id, ...doc.data() }]);
      });
    }

    if (!entriesLoaded) {
      fetchEntries();
      setEntriesLoaded(true);
    }
  }, []);

  useEffect(() => {
    async function fetchTerms() {
      setTerms({});
      const querySnapshot = await getDocs(collection(db, 'Terms'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setTerms({ ...terms, [doc.id]: doc.data().name });
      });
    }

    if (!termsLoaded) {
      fetchTerms();
      setTermsLoaded(true);
    }
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      setUsers([]);
      const querySnapshot = await getDocs(collection(db, 'Users'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setUsers([...users, { id: doc.id, ...doc.data() }]);
      });
    }
  }, []);
  console.log(entries);

  const onAddEntry = async (communityId, selected) => {
    // const userRef = doc(db, 'Users', userData._id);
    // const docSnap = await getDoc(userRef);

    // console.log(docSnap.data());

    console.log(selected);

    // await updateDoc(userRef, {
    //   communities: {
    //     ...docSnap.data().communities,
    //     [communityId]: selected
    //   }
    // });
  };

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
        {entries.map((entry, index) => (
          <div key={index}>
            <h2>{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
          </div>
        ))}
        {/* This will be an admin only section once we add authorization */}
        <section className="add-entry">
          <h2>Add New Entry</h2>
          <div className="text-box">
            <div className="text-box-item">
              <select id="term-select">
                {Object.keys(terms).map((key) => (
                  <option key={key} value={terms[key]}>
                    {terms[key]}
                  </option>
                ))}
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
