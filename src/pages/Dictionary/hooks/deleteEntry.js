import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase';

const deleteEntry = (entryid) => {
  const col = collection(db, 'Entries');
  const entriesRef = doc(col, 'entryid');
  const mutation = useFirestoreDocumentDeletion(entriesRef);
  return mutation.status;
};

export default deleteEntry;
