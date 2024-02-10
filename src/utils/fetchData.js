import { collection, query } from 'firebase/firestore';
import { db } from './firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';

export const fetchEntries = (entryid = 'Entries') => {
  const ref = query(collection(db, 'Entries'));
  const entriesQuery = useFirestoreQuery([entryid], ref);
  if (entriesQuery.isLoading) {
    return undefined;
  }
  const snapshot = entriesQuery.data;
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchTerms = (termid = 'Terms') => {
  const ref = query(collection(db, 'Terms'));
  const termsQuery = useFirestoreQuery([termid], ref);
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
