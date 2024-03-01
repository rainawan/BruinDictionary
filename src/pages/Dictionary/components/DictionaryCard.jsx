import { updateLikes, updateDislikes } from '../../../utils/firebaseOperations';
import { LikesDislikesButton } from './LikesDislikesButton.jsx';
import { useState } from 'react';

export const DictionaryCard = ({ entry, terms }) => {
  // Create a state to hold updated likes
  const [likes, setLikes] = useState(entry.likes);
  const [dislikes, setDislikes] = useState(entry.dislikes);

  // Function to handle like button click
  const handleLikeState = (entryID) => {
    // Increment the like count for the entry
    setLikes((prevLikes) => ({
      ...prevLikes,
      [entryID]: (prevLikes[entryID] || 0) + 1
    }));
  };

  const handleDislikeState = (entryID) => {
    // Increment the dislike count for the entry
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [entryID]: (prevDislikes[entryID] || 0) + 1
    }));
  };

  const handleLike = async (entryID) => {
    // Call a function to update the likes count in Firebase
    await updateLikes(entryID);
  };

  const handleDislike = async (entryID) => {
    // Call a function to update the dislikes count in Firebase
    await updateDislikes(entryID);
  };

  const handleLikeButton = (entryID) => {
    handleLike(entryID);
    handleLikeState(entryID);
  };

  const handleDislikeButton = (entryID) => {
    handleDislike(entryID);
    handleDislikeState(entryID);
  };
  return (
    <div>
      <h2>{terms[entry.termid]}</h2>
      <h3>Definition</h3>
      <p>{entry.definition}</p>
      <h3>Example</h3>
      <p>{entry.example}</p>
      <button onClick={() => handleLikeButton(entry.id)}>Like</button>
      <button onClick={() => handleDislikeButton(entry.id)}>Dislike</button>
      <span>{(likes || 0) - (dislikes || 0)}</span>
      {/* <LikesDislikesButton likes={likes} dislikes={dislikes} /> */}
      <br />
    </div>
  );
};
