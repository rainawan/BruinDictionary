import { useSearchParams } from 'react-router-dom';
import { Select, SelectItem } from '@nextui-org/react';

const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order');

  const handleSelectionChange = (key) => {
    searchParams.set('order', Object.values(key)[0]);
    setSearchParams(searchParams);
  };

  return (
    <Select
      className="max-w-[10rem] right-0"
      popoverProps={{
        classNames: {
          content: 'dark:dark'
        }
      }}
      label="Sort by"
      size="sm"
      selectionMode="single"
      onSelectionChange={handleSelectionChange}
      selectedKeys={order !== '' && order ? [order] : []}>
      <SelectItem key="likes">Likes</SelectItem>
      <SelectItem key="creationDate">Creation Date</SelectItem>
    </Select>
  );
};

export default SortDropdown;
