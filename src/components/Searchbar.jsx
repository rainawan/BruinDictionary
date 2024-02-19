import { useNavigate, useSearchParams } from 'react-router-dom';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';

const items = [
  {
    termid: '0',
    name: 'UCLA',
    description: 'University of California, Los Angeles'
  },
  {
    termid: '1',
    name: 'YRL',
    description: 'Young Research Library'
  }
];

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term');

  const handleSelectionChange = (termid) => {
    if (termid) {
      navigate(`/?term=${termid}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Autocomplete
      aria-label="searchbar"
      variant="bordered"
      radius="full"
      menuTrigger="input"
      defaultItems={items}
      defaultInputValue={searchTerm}
      onSelectionChange={handleSelectionChange}
      classNames={{ selectorButton: 'hidden' }}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[3rem]'
        }
      }}
      popoverProps={{
        classNames: {
          content: 'dark:dark'
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
        <AutocompleteItem key={item.termid} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <div className="font-bold">{item.name}</div>
            <div className="truncate">{item.description}</div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Searchbar;
