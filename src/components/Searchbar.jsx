import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

const items = [
  {
    termid: '0',
    term: 'UCLA',
    description: 'University of California, Los Angeles'
  },
  {
    termid: '1',
    term: 'YRL',
    description: 'Young Research Library'
  }
];

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSelection = (term) => {
    if (term) {
      navigate(`/?term=${term}`);
    } else {
      navigate('/');
    }
  };
  const handleInputChange = debounce(setSearchTerm, 500);

  return (
    <Autocomplete
      aria-label="search term"
      variant="bordered"
      radius="full"
      menuTrigger="input"
      defaultItems={items}
      onSelectionChange={handleSelection}
      onInputChange={handleInputChange}
      classNames={{ selectorButton: 'hidden' }}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[3rem]'
        }
      }}
      popoverProps={{
        classNames: {
          content: 'dark:bg-gray-800'
        }
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: 'transition-opacity'
        }
      }}
      endContent={<SearchOutlined className="text-xl mr-2 mt-[-3px]" />}>
      {(item) => (
        <AutocompleteItem key={item.term} textValue={item.term}>
          <div className="flex gap-2 items-center">
            <div className="font-bold">{item.term}</div>
            <div className="truncate">{item.description}</div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Searchbar;
