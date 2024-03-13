import React from 'react';
import { Button, Spinner, Card } from '@nextui-org/react';
import LoadingCard from '../../Dictionary/components/LoadingCard';
import DictionaryCard from '../../Dictionary/components/DictionaryCard';
import getInfiniteEntriesQuery from '../../../utils/getInfiniteEntriesQuery';
import useCurrentUserData from '../../../utils/useCurrentUserData';
import { unpackInfiniteEntriesQuery, unpackTermsQuery } from '../../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../../utils/getTermsEntriesStatus';
import getTermsQuery from '../../../utils/getTermsQuery';

const UserPosts = () => {
  const { userData } = useCurrentUserData();
  const userid = userData.userid;

  const QUERY_LIMIT = 3;

  const termsQuery = getTermsQuery();
  const entriesQuery = getInfiniteEntriesQuery(QUERY_LIMIT, { userid });
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const { status: entriesStatus, data: entries } = unpackInfiniteEntriesQuery(entriesQuery);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);
  console.log(entries);

  if (status === 'loading') {
    return <LoadingCard />;
  } else if (status === 'error') {
    return <div>error occurred</div>;
  } else if (Object.keys(terms)?.length === 0 || entries?.length === 0) {
    return <Card className="p-4">No terms found for user</Card>;
  } else if (status === 'success') {
    return (
      <div className="inline-flex flex-col gap-4 max-w-[55rem] pt-2 px-4 w-full">
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
  }
};

export default UserPosts;
