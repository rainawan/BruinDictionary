import { collection, query, where, limit, orderBy, startAfter } from 'firebase/firestore';
import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import { db } from './firebase';

// CURRENTLY ORDERING WITH termid OR userid ONLY WORKS FOR 'likes' AND 'creationDate'
const getInfiniteEntriesQuery = (count = 10, { termid, userid, order = 'likes' }) => {
  const ref = query(
    collection(db, 'Entries'),
    ...(termid ? [where('termid', '==', termid)] : []),
    ...(userid ? [where('userid', '==', userid)] : []),
    ...(order ? [orderBy(order, 'desc')] : []),
    limit(count)
  );
  const queryKey = ['Entries', { termid, userid, order, count }];

  const entriesQuery = useFirestoreInfiniteQuery(queryKey, ref, (snapshot) => {
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    if (!lastDoc) return;
    return query(ref, startAfter(lastDoc));
  });

  return entriesQuery;
};

export default getInfiniteEntriesQuery;
