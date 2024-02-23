// Import the necessary Firestore functions
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase.js';

export const updateLikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the likes field
  await updateDoc(entryRef, {
    likes: increment(1)
  });
};

export const updateDislikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the dislikes field
  await updateDoc(entryRef, {
    dislikes: increment(1)
  });
};
