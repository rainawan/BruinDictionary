import { useSearchParams } from 'react-router-dom';
import { Button, Spinner } from '@nextui-org/react';
import { unpackInfiniteEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getInfiniteEntriesQuery from '../../utils/getInfiniteEntriesQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import LoadingCard from './components/LoadingCard';
import DictionaryCard from './components/DictionaryCard';
import SortDropdown from './components/SortDropdown';

const QUERY_LIMIT = 10;

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term !== undefined ? term.toLowerCase() : undefined;

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const termid = searchTerm && terms ? Object.keys(terms) : undefined;

  const entriesQuery = getInfiniteEntriesQuery(QUERY_LIMIT, {
    ...search,
    termid: termid ?? search.termid
  });
  const { status: entriesStatus, data: entries } = unpackInfiniteEntriesQuery(entriesQuery);
  // console.log('entries: ', entries, '\nterms: ', terms);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);

  if (status === 'loading') {
    return <LoadingCard />;
  } else if (status === 'error') {
    return <div>error occurred</div>;
  } else if (Object.keys(terms)?.length === 0 || entries?.length === 0) {
    return <div>not found</div>;
  } else if (status === 'success') {
    return (
      <div className="inline-flex flex-col gap-4 max-w-[55rem] pt-2 px-4 w-full">
        <SortDropdown />
        {entries.map((entry, index) => (
          <DictionaryCard key={index} entry={entry} terms={terms} />
        ))}
        {entriesQuery.hasNextPage && entries.length % QUERY_LIMIT === 0 && (
          <Button disabled={!entriesQuery.isFetched} onClick={entriesQuery.fetchNextPage}>
            {entriesQuery.isFetching ? <Spinner size="sm" /> : <p>Load More</p>}
          </Button>
        )}
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
