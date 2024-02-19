import { collection, query, where, limit } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

const getTermsQuery = (termname = undefined) => {
  const termsRef = query(
    collection(db, 'Terms'),
    ...(termname ? [where('termname', '==', termname), limit(1)] : [])
  );
  const termsQuery = useFirestoreQuery(['Terms', { termname }], termsRef);
  return termsQuery;
};

export default getTermsQuery;
