import { collection, query, where, limit, orderBy, startAfter } from 'firebase/firestore';
import { useFirestoreQuery, useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

// CURRENTLY ORDER ONLY WORKS FOR 'likes' AND 'createdDate'
// TALK WITH SONYA BEFORE THE CHANGE
const getEntriesQuery = ({ termid, userid, order, count, infinite } = {}) => {
  const ref = query(
    collection(db, 'Entries'),
    ...(termid ? [where('termid', '==', termid)] : []),
    ...(userid ? [where('userid', '==', userid)] : []),
    ...(order ? [orderBy(order, 'desc')] : []),
    ...(count ? [limit(count)] : [])
  );
  const queryKey = ['Entries', { termid, userid, order, count }];

  let entriesQuery;
  if (infinite && count) {
    // this is for infinite scrolling for the future
    entriesQuery = useFirestoreInfiniteQuery(queryKey, ref, (snapshot) => {
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      return query(ref, startAfter(lastDoc));
    });
  } else {
    entriesQuery = useFirestoreQuery(queryKey, ref);
  }
  return entriesQuery;
};

export default getEntriesQuery;
