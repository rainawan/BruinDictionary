import { useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { unpackEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getEntriesQuery from '../../utils/getEntriesQuery';
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

  const entriesQuery = getEntriesQuery({ termid, ...search });
  const { status: entriesStatus, data: entries } = unpackEntriesQuery(entriesQuery);
  console.log('entries: ', entries, '\nterms: ', terms);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);

  // const intObserver = useRef();
  // const lastPostRef = useCallback((post) => {
  //   if (status === 'loading') return;
  //   if (intObserver.current) intObserver.current.disconnect();
  //   intObserver.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       console.log('intersecting');
  //     }
  //   });
  // });

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
        <button onClick={entriesQuery.fetchNextPage}>aa</button>
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
