import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { doc, increment, onSnapshot } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase.js';
import useCurrentUserData from '../../../utils/useCurrentUserData.js';
import getUserByID from '../../../utils/getUserByID.js';

const LIKE = true;
const DISLIKE = false;

const useEntryData = (entryId) => {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'Entries', entryId), (doc) => {
      setEntry({ id: doc.id, ...doc.data() });
    });

    return () => unsubscribe();
  }, [entryId]);

  return entry;
};

const LikeDislikeButtons = ({ entry }) => {
  // null action means no previous action
  const [action, setAction] = useState(null);
  const [userDoc, setUserDoc] = useState({});
  const { userData } = useCurrentUserData();
  const [isLoading, setIsLoading] = useState(true);

  const entryID = entry.id;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData && userData.userid) {
        const data = await getUserByID(userData.userid);
        setUserDoc(data);
        setIsLoading(false);
      } else {
        setIsLoading(null); // if no userData, not logged in
      }
    };

    fetchUserData();
  }, [userData]);

  const entryDocRef = doc(db, 'Entries', entryID);
  const userDocRef = userData ? doc(db, 'Users', userData.userid) : null;
  const entryData = useEntryData(entry.id);

  const mutateEntry = useFirestoreDocumentMutation(entryDocRef, { merge: true });
  const mutateUser = useFirestoreDocumentMutation(userDocRef, { merge: true });

  if (isLoading && userData) {
    return <div>Loading user data...</div>;
  } else if (isLoading === null && !userData) {
    // if not logged in
    return (
      <div className="inline-flex flex-row gap-1">
        <Button className={'hover:text-green-500'} onClick={null}>
          <LikeFilled className="text-lg" />
          <p className="text-black dark:text-white">{entryData ? entryData.likes : entry.likes}</p>
        </Button>
        <Button className={'hover:text-red-500'} onClick={null}>
          <DislikeFilled className="text-lg" />
          <p className="text-black dark:text-white">
            {entryData ? entryData.dislikes : entry.dislikes}
          </p>
        </Button>
      </div>
    );
  }

  const handleAction = (newAction) => {
    let updateUser = {
      // Initialize or retain existing likes/dislikes structure
      likes: userDoc.likes || {},
      dislikes: userDoc.dislikes || {}
    };

    switch (newAction) {
      case LIKE:
        if (action === LIKE || updateUser.likes[entryID] === true) {
          // unclicked like -> dec like
          mutateEntry.mutate({
            likes: increment(-1)
          });

          updateUser.likes[entryID] = false;
          mutateUser.mutate({
            likes: updateUser.likes
          });

          setAction(null);
        } else {
          if (action === DISLIKE || updateUser.dislikes[entryID] === true) {
            // switched dislike to like -> inc like, dec dislike
            mutateEntry.mutate({
              likes: increment(1),
              dislikes: increment(-1)
            });

            updateUser.likes[entryID] = true;
            updateUser.dislikes[entryID] = false;
            mutateUser.mutate({
              likes: updateUser.likes,
              dislikes: updateUser.dislikes
            });
          } else {
            // when action === null
            // no previous action -> inc like
            mutateEntry.mutate({
              likes: increment(1)
            });

            updateUser.likes[entryID] = true;
            mutateUser.mutate({
              likes: updateUser.likes
            });
          }
          setAction(LIKE);
        }
        break;
      case DISLIKE:
        if (action === DISLIKE || updateUser.dislikes[entryID] === true) {
          // unclicked dislike -> dec dislike
          mutateEntry.mutate({
            dislikes: increment(-1)
          });

          updateUser.dislikes[entryID] = false;
          mutateUser.mutate({
            dislikes: updateUser.dislikes
          });

          setAction(null);
        } else {
          if (action === LIKE || updateUser.likes[entryID] === true) {
            // switched like to dislike -> inc dislike, dec like
            mutateEntry.mutate({
              likes: increment(-1),
              dislikes: increment(1)
            });

            updateUser.dislikes[entryID] = true;
            updateUser.likes[entryID] = false;
            mutateUser.mutate({
              likes: updateUser.likes,
              dislikes: updateUser.dislikes
            });
          } else {
            // when action === null
            // no previous action -> inc dislike
            mutateEntry.mutate({
              dislikes: increment(1)
            });

            updateUser.dislikes[entryID] = true;
            mutateUser.mutate({
              dislikes: updateUser.dislikes
            });
          }
          setAction(DISLIKE);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="inline-flex flex-row gap-1">
      <Button
        className={`hover:text-green-500 ${userDoc.likes && userDoc.likes[entry.id] ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleAction(LIKE)}>
        <LikeFilled className="text-lg" />
        <p className="text-black dark:text-white">{entryData ? entryData.likes : entry.likes}</p>
      </Button>
      <Button
        className={`hover:text-red-500 ${userDoc.dislikes && userDoc.dislikes[entry.id] ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction(DISLIKE)}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {entryData ? entryData.dislikes : entry.dislikes}
        </p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
