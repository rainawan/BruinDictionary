import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { toast } from 'sonner';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

const useDeleteEntry = (entryid) => {
  const navigate = useNavigate();
  const colRef = collection(db, 'Entries');
  const docRef = doc(colRef, entryid);

  return useFirestoreDocumentDeletion(docRef, {
    onSuccess: () => {
      toast.success('Deleted successfully!');
      navigate(0);
    },
    onError: () => {
      toast.error('Error occured. Please try again.');
    },
    onMutate: () => {
      toast('Deleting...');
    }
  });
};

export default useDeleteEntry;
