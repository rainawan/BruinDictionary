import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

async function getUserByID(userId) {
  try {
    const userDocRef = doc(db, 'Users', userId);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log('No such document!');
      return { id: docSnapshot.id, likes: {}, dislikes: {} };
    }
  } catch (error) {
    console.error('Error fetching user document:', error);
    throw error;
  }
}

export default getUserByID;
