import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

export const fetchEntries = () => {
  const ref = query(collection(db, 'Entries'));
  const entriesQuery = useFirestoreQuery(['Entries'], ref);
  if (entriesQuery.isLoading) {
    return { entriesStatus: 'LOADING', entriesData: undefined };
  } else if (entriesQuery.isError) {
    return { entriesStatus: 'ERROR', entriesData: undefined };
  }

  const snapshot = entriesQuery.data;
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { entriesStatus: 'SUCCESS', entriesData: data };
};

export const fetchTerms = () => {
  const ref = query(collection(db, 'Terms'));
  const termsQuery = useFirestoreQuery(['Terms'], ref);
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
  // FIXME: use Authentication instead of Firestore
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
  try {
    const { entriesStatus, entriesData: entries } = fetchEntries();
    const { termsStatus, termsData: terms } = fetchTerms();

    if (entriesStatus === 'LOADING' || termsStatus === 'LOADING') {
      return { status: 'LOADING', data: undefined };
    } else if (entriesStatus === 'ERROR' || termsStatus === 'ERROR') {
      return { status: 'ERROR', data: undefined };
    } else if (entriesStatus === 'SUCCESS' && termsStatus === 'SUCCESS') {
      return { status: 'SUCCESS', data: { entries, terms } };
    } else {
      throw new Error(
        `Unhandled status: entriesStatus=${entriesStatus}, termsStatus=${termsStatus}`
      );
    }
  } catch (error) {
    console.error(error);
    return { status: 'ERROR', data: undefined };
  }
};
