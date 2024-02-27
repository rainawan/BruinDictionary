import { useSearchParams } from 'react-router-dom';
import { Select, SelectItem } from '@nextui-org/react';
import { unpackEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getEntriesQuery from '../../utils/getEntriesQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import CardLoading from './components/CardLoading';

const Dictionary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term?.toLowerCase();

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const termid = searchTerm && terms ? Object.keys(terms)[0] : undefined;

  const entriesQuery = getEntriesQuery({ termid, ...search });
  const { status: entriesStatus, data: entries } = unpackEntriesQuery(entriesQuery);
  console.log('entries: ', entries, '\nterms: ', terms);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);

  const handleSortChange = (key) => {
    setSearchParams({ ...searchEntries, order: Object.values(key)[0] });
  };

  if (status === 'loading') {
    return <CardLoading />;
  } else if (status === 'error') {
    return <div>error occurred</div>;
  } else if ((searchTerm && !termid) || entries?.length === 0) {
    return <div>not found</div>;
  } else if (status === 'success') {
    return (
      <div className="Terms">
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
          onSelectionChange={handleSortChange}
          selectedKeys={search.order !== '' && search.order ? [search.order] : []}>
          <SelectItem key="likes">Likes</SelectItem>
          <SelectItem key="creationDate">Creation Date</SelectItem>
        </Select>
        {entries.map((entry, index) => (
          <div key={index}>
            <h2>{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
