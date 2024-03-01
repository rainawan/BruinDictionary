import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure
} from '@nextui-org/react';
import { MoreOutlined } from '@ant-design/icons';
import DeleteConfirmModal from './DeleteConfirmModal';

const MoreDropdown = ({ entryid, setEditEntryid }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleMenuClick = (e) => {
    if (e === 'edit') {
      setEditEntryid(entryid);
    }
    if (e === 'delete') {
      onOpen(); // open modal
    }
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
      <DeleteConfirmModal entryid={entryid} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default MoreDropdown;
