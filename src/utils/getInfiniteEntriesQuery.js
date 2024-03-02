import { collection, query, where, limit, orderBy, startAfter } from 'firebase/firestore';
import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

// CURRENTLY ORDERING WITH termid OR userid ONLY WORKS FOR 'likes' AND 'creationDate'
const getEntriesQuery = ({ termid, userid, order, count } = {}) => {
  const ref = query(
    collection(db, 'Entries'),
    ...(termid ? [where('termid', '==', termid)] : []),
    ...(userid ? [where('userid', '==', userid)] : []),
    ...(order ? [orderBy(order, 'desc')] : []),
    ...(count ? [limit(count)] : [])
  );
  const queryKey = ['Entries', { termid, userid, order, count }];

  // this is for infinite scrolling for the future
  const entriesQuery = useFirestoreInfiniteQuery(queryKey, ref, (snapshot) => {
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return query(ref, startAfter(lastDoc));
  });

  return entriesQuery;
};

export default getEntriesQuery;
