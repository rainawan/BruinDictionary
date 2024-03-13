import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { db } from './firebase';

const getEditEntriesMutation = (entryID) => {
  const entryCollection = collection(db, 'Entries');
  const ref = doc(entryCollection, entryID);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true
  });

  return mutation;
};

export default getEditEntriesMutation;
