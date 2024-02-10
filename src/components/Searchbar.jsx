import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (term) => {
    setSearchTerm(() => term);
  };

  return (
    <div className="Searchbar">
      <Input
        value={searchTerm}
        onValueChange={(val) => handleChange(val)}
        type="search"
        radius="full"
        fullWidth="true"
        variant="bordered"
        startContent={<SearchOutlined className="text-xl" />}
      />
    </div>
  );
};

export default Searchbar;
