import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { db } from './firebase';

const useDeleteEntry = (entryid, options) => {
  const colRef = collection(db, 'Entries');
  const docRef = doc(colRef, entryid);

  return useFirestoreDocumentDeletion(docRef, options);
};

export default useDeleteEntry;
