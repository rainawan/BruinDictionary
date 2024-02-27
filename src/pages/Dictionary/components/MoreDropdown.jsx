import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure
} from '@nextui-org/react';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const MoreDropdown = ({ entryid }) => {
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
      <DeleteModal entryid={entryid} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default MoreDropdown;
