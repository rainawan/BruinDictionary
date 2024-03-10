import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

const getTermsQuery = (termname = undefined) => {
  const termsRef = query(
    collection(db, 'Terms'),
    ...(termname !== undefined ? [where('termname', '==', termname)] : [])
  );
  const termsQuery = useFirestoreQuery(['Terms', { termname }], termsRef);
  return termsQuery;
};

export default getTermsQuery;
