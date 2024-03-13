import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { db } from './firebase';

const getUserMutation = (userID) => {
  const userCollection = collection(db, 'Users');
  const ref = doc(userCollection, userID);

  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true
  });

  return mutation;
};

export default getUserMutation;
