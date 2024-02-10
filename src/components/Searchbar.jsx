import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';

const Searchbar = () => {
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

  return (
    <Autocomplete
      aria-label="search term"
      variant="bordered"
      radius="full"
      defaultItems={items}
      classNames={{ selectorButton: 'hidden' }}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[45px]'
        }
      }}
      popoverProps={{
        classNames: {
          content: 'bg-white dark:bg-gray-800'
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
        <AutocompleteItem key={item.termid} textValue={item.term}>
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
