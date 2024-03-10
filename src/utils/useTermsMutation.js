import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from './firebase';

const useTermsMutation = () => {
  const ref = collection(db, 'Terms');
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export default useTermsMutation;
