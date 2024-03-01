import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { toast } from 'sonner';
import { db } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmModal = ({ entryid, isOpen, onOpenChange }) => {
  const navigate = useNavigate();
  const colRef = collection(db, 'Entries');
  const docRef = doc(colRef, entryid);
  const mutation = useFirestoreDocumentDeletion(docRef, {
    onSuccess: () => {
      toast.success('Deleted successfully!');
    },
    onError: () => {
      toast.error('Error occured. Please try again.');
    },
    onMutate: () => {
      toast('Deleting...');
    },
    onSettled: () => {
      // FIXME: I could not refetch the data after deletion..
      // so i am just refreshing the page by navigating to the same page....
      // queryClient.invalidateQueries(['Entries']);
      navigate(0);
    }
  });

  const handleDelete = () => {
    // console.log(queryClient.getQueryData(['Entries', {}]).docs);
    mutation.mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="dark:dark p-3 w-fit"
      classNames={{ wrapper: 'items-center', backdrop: 'w-full h-full' }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="m-2">
              <p>Are you sure you want to delete this item?</p>
            </ModalBody>
            <ModalFooter className="p-0">
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  handleDelete();
                  onClose();
                }}>
                Yes
              </Button>
              <Button color="primary" variant="light" onPress={onClose}>
                No
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmModal;
