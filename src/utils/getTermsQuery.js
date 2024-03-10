import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

const getTermsQuery = ({ termname, name } = {}) => {
  const termsRef = query(
    collection(db, 'Terms'),
    ...(termname !== undefined ? [where('termname', '==', termname)] : []),
    ...(name !== undefined ? [where('name', '==', name)] : [])
  );
  const termsQuery = useFirestoreQuery(['Terms', { termname }], termsRef);
  return termsQuery;
};

export default getTermsQuery;
