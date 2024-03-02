import { useSearchParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { unpackInfiniteEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getInfiniteEntriesQuery from '../../utils/getInfiniteEntriesQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import LoadingCard from './components/LoadingCard';
import DictionaryCard from './components/DictionaryCard';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term !== undefined ? term.toLowerCase() : undefined;

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const termid = searchTerm && terms ? Object.keys(terms)[0] : undefined;

  const entriesQuery = getInfiniteEntriesQuery({ termid, count: 10, ...search });
  const { status: entriesStatus, data: entries } = unpackInfiniteEntriesQuery(entriesQuery);
  console.log('entries: ', entries, '\nterms: ', terms);

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
        {entries.map((entry, index) => (
          <DictionaryCard key={index} entry={entry} terms={terms} />
        ))}
        <Button disabled={!entriesQuery.hasNextPage} onClick={entriesQuery.fetchNextPage}>
          Load More
        </Button>
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
