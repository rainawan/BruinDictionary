// Import the necessary Firestore functions
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase.js';

export const incrementLikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the likes field
  await updateDoc(entryRef, {
    likes: increment(1)
  });
};

export const decrementLikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the likes field
  await updateDoc(entryRef, {
    likes: increment(-1)
  });
};

export const incrementDislikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the dislikes field
  await updateDoc(entryRef, {
    dislikes: increment(1)
  });
};

export const decrementDislikes = async (entryId) => {
  const entryRef = doc(db, 'Entries', entryId);

  // Increment the dislikes field
  await updateDoc(entryRef, {
    dislikes: increment(-1)
  });
};
