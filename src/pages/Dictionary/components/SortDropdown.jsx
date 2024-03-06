import { useSearchParams } from 'react-router-dom';
import { Select, SelectItem } from '@nextui-org/react';

const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order');

  const handleSelectionChange = (key) => {
    const orderKey = Object.values(key)[0];
    if (!orderKey) return;
    searchParams.set('order', orderKey);
    setSearchParams(searchParams);
  };

  return (
    <Select
      className="max-w-[10rem] right-0 self-end"
      popoverProps={{
        classNames: {
          content: 'dark:dark'
        }
      }}
      label="Sort by"
      size="sm"
      selectionMode="single"
      onSelectionChange={handleSelectionChange}
      defaultSelectedKeys={['likes']}
      selectedKeys={order && order === 'creationDate' ? ['creationDate'] : ['likes']}>
      <SelectItem key="likes">Most Liked</SelectItem>
      <SelectItem key="creationDate">Most Recent</SelectItem>
    </Select>
  );
};

export default SortDropdown;
