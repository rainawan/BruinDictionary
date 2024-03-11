import { useState, useEffect } from 'react';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * @deprecated INSTEAD USE getEntriesQuery
 */
export const fetchEntries = () => {
  const ref = query(collection(db, 'Entries'));
  const entriesQuery = useFirestoreQuery(['Entries'], ref);
  if (entriesQuery.isLoading) {
    return undefined;
  }
  const snapshot = entriesQuery.data;
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * @deprecated INSTEAD USE getTermsQuery
 */
export const fetchTerms = () => {
  const ref = query(collection(db, 'Terms'));
  const termsQuery = useFirestoreQuery(['Terms'], ref);
  if (termsQuery.isLoading) {
    return undefined;
  }
  const snapshot = termsQuery.data;
  return snapshot.docs.reduce((prev, doc) => {
    prev[doc.id] = doc.data().name;
    return prev;
  }, {});
};

export const fetchUsers = () => {
  const ref = query(collection(db, 'Users'));
  const usersQuery = useFirestoreQuery(['Users'], ref);
  if (usersQuery.isLoading) {
    return undefined;
  }
  const snapshot = usersQuery.data;
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const fetchUserById = (userId) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; // Early return if userId is not provided
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'Users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
          setError('No such document!');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Re-run the effect if userId changes

  return { userData, isLoading, error };
};

export default fetchUserById;
// // // used for like/dislike feature
// export const fetchUserById = (userId) => {
//   const docRef = doc(db, 'Users', userId);
//   const userQuery = useFirestoreQuery(['User', userId], docRef);

//   if (userQuery.isLoading) {
//     return undefined;
//   }

//   if (!userQuery.data.exists()) {
//     console.error('User not found');
//     return undefined;
//   }

//   return { id: userQuery.data.id, ...userQuery.data.data() };
// };
