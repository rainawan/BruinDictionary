import { useSearchParams } from 'react-router-dom';
import { fetchEntries, fetchTerms, fetchUsers } from '../../utils/fetchData';
import { updateLikes, updateDislikes } from '../../utils/firebaseOperations';
import { LikesDislikesButton } from './components/LikesDislikesButton.jsx';
import { useState } from 'react';

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
  const handleLikeState = (entry) => {
    // Increment the like count for the entry
    setLikes((prevLikes) => ({
      ...prevLikes,
      [entry.id]: (prevLikes[entry.id] || 0) + 1
    }));
  };

  const handleDislikeState = (entry) => {
    // Increment the dislike count for the entry
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [entry.id]: (prevDislikes[entry.id] || 0) + 1
    }));
  };

  const handleLike = async (entry) => {
    // Call a function to update the likes count in Firebase
    await updateLikes(entry.id);
  };

  const handleDislike = async (entry) => {
    // Call a function to update the dislikes count in Firebase
    await updateDislikes(entry.id);
  };

  const handleLikeButton = (entry) => {
    handleLike(entry);
    handleLikeState(entry);
  };

  const handleDislikeButton = (entry) => {
    handleDislike(entry);
    handleDislikeState(entry);
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
            <button onClick={() => handleLikeButton(entry)}>Like</button>
            <button onClick={() => handleDislikeButton(entry)}>Dislike</button>
            <LikesDislikesButton likes={likes[entry.id]} dislikes={dislikes[entry.id]} />
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Dictionary;
