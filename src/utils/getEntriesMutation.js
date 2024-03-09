import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from './firebase';

const getEntriesMutation = () => {
  const ref = collection(db, 'Entries');
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export default getEntriesMutation;
