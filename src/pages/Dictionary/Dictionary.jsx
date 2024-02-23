import { useSearchParams } from 'react-router-dom';
import { fetchEntries, fetchTerms, fetchUsers } from '../../utils/fetchData';
import { useState } from 'react';
// import { db, auth } from '../../utils/firebase.js';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term')?.toLowerCase();

  const entries = fetchEntries();
  const terms = fetchTerms();
  const users = fetchUsers();
  console.log('entries: ', entries, '\nterms: ', terms, '\nusers: ', users);

  // Create a state to hold updated likes
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  // Function to handle like button click
  const handleLike = (entry) => {
    // Increment the like count for the entry
    setLikes((prevLikes) => ({
      ...prevLikes,
      [entry.id]: (prevLikes[entry.id] || 0) + 1
    }));
  };
  const handleDislike = (entry) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [entry.id]: (prevDislikes[entry.id] || 0) + 1
    }));
  };

  return (
    <div className="Terms">
      {entries && terms && users ? (
        entries.map((entry, index) => (
          <div key={index}>
            <h2>{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
            <button onClick={() => handleLike(entry)}>Like</button>
            <button onClick={() => handleDislike(entry)}>Dislike</button>
            <span>{(likes[entry.id] || 0) - (dislikes[entry.id] || 0)}</span>
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Dictionary;
