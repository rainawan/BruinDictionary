import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

export const fetchEntries = (entryid = 'Entries') => {
  const ref = query(collection(db, 'Entries'));
  const entriesQuery = useFirestoreQuery([entryid], ref);
  if (entriesQuery.isLoading) {
    return { entriesStatus: 'LOADING', entriesData: undefined };
  } else if (entriesQuery.isError) {
    return { entriesStatus: 'ERROR', entriesData: undefined };
  }

  const snapshot = entriesQuery.data;
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { entriesStatus: 'SUCCESS', entriesData: data };
};

export const fetchTerms = (termid = 'Terms') => {
  const ref = query(collection(db, 'Terms'));
  const termsQuery = useFirestoreQuery([termid], ref);
  if (termsQuery.isLoading) {
    return { termsStatus: 'LOADING', termsData: undefined };
  } else if (termsQuery.isError) {
    return { termsStatus: 'ERROR', termsData: undefined };
  }

  const snapshot = termsQuery.data;
  const data = snapshot.docs.reduce((prev, doc) => {
    prev[doc.id] = doc.data().name;
    return prev;
  }, {});

  return { termsStatus: 'SUCCESS', termsData: data };
};

export const fetchUsers = () => {
  const ref = query(collection(db, 'Users'));
  const usersQuery = useFirestoreQuery(['Users'], ref);

  if (usersQuery.isLoading) {
    return { status: 'LOADING', data: undefined };
  } else if (usersQuery.isError) {
    return { status: 'ERROR', data: undefined };
  }

  const snapshot = usersQuery.data;
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { usersStatus: 'SUCCESS', usersData: data };
};

export const fetchTermEntries = () => {
  const { entriesStatus, entriesData: entries } = fetchEntries();
  const { termsStatus, termsData: terms } = fetchTerms();
  console.log('entries: ', entries, '\nterms: ', terms);

  switch (entriesStatus && termsStatus) {
    case 'LOADING':
      return { status: 'LOADING', data: undefined };
    case 'ERROR':
      return { status: 'ERROR', data: undefined };
    case 'SUCCESS':
      return { status: 'SUCCESS', data: { entries, terms } };
    default:
      throw new Error('Unhandled status');
  }
};
