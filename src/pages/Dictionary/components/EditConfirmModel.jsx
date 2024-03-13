import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react';

const EditConfirmModal = ({ isOpen, onOpenChange, handleSubmit }) => {
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
              <p>Are you sure you want to update this item?</p>
            </ModalBody>
            <ModalFooter className="p-0">
              <Button
                color="danger"
                variant="light"
                onPress={(e) => {
                  handleSubmit();
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

export default EditConfirmModal;
