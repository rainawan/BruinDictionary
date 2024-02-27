import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button
} from '@nextui-org/react';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MenuDropdown = ({ entryid }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e === 'edit') {
      navigate(`/edit/${entryid}`);
    }
    if (e === 'delete') {
      onOpen(); // open modal
    }
  };

  const handleDelete = () => {
    // TODO: delete entry
  };

  return (
    <>
      <Dropdown
        showArrow
        variant="light"
        backdrop="opaque"
        placement="bottom-end"
        classNames={{
          base: 'dark:dark text-center',
          content: 'min-w-[6rem]'
        }}>
        <DropdownTrigger>
          <MoreOutlined className="text-2xl" />
        </DropdownTrigger>
        <DropdownMenu aria-label="dropdown variants" variant="light" onAction={handleMenuClick}>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark:dark p-3 w-fit">
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
                    onClose();
                    handleDelete();
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
    </>
  );
};

export default MenuDropdown;
