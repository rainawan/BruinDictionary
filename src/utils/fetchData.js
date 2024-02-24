import { collection, query } from 'firebase/firestore';
import { db } from './firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';

/**
 * @deprecated
 * USE getEntriesQuery AND getTermsQuery INSTEAD
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
