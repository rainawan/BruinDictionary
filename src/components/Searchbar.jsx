import { useNavigate, useSearchParams } from 'react-router-dom';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';
import { fetchTermEntries } from '../utils/fetchData';

const Searchbar = () => {
  const { status, data } = fetchTermEntries();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term');

  if (status !== 'SUCCESS') {
    return;
  }

  const { entries, terms } = data;
  const handleSelection = (termid) => {
    if (termid) {
      navigate(`/?term=${terms[termid]}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Autocomplete
      aria-label="search term"
      variant="bordered"
      radius="full"
      menuTrigger="input"
      defaultItems={entries}
      defaultInputValue={searchTerm}
      onSelectionChange={handleSelection}
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
        <AutocompleteItem key={item.termid} textValue={terms[item.termid]}>
          <div className="flex gap-2 items-center">
            <div className="font-bold">{terms[item.termid]}</div>
            <div className="truncate">{item.definition}</div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Searchbar;
