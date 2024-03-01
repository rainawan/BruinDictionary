import { collection, doc } from 'firebase/firestore';
import { useQueryClient } from 'react-query';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { toast } from 'sonner';
import { db } from '../../../utils/firebase';

const deleteEntry = (entryid) => {
  const queryClient = useQueryClient();
  const colRef = collection(db, 'Entries');
  const docRef = doc(colRef, entryid);
  const mutation = useFirestoreDocumentDeletion(docRef, {
    onSuccess: async () => {
      toast.success('Deleted successfully!');
      await queryClient.invalidateQueries(['Entries', 'Terms']);
    },
    onError: () => {
      toast.error('Error occured. Please try again.');
    },
    onMutate: () => {
      toast('Deleting...');
    }
  });
  return mutation;
};

export default deleteEntry;
