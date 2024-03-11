import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { doc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase.js';
import getCurrentUserDocument from '../../../utils/getCurrentUserQuery.js';

const LIKE = true;
const DISLIKE = false;

const LikeDislikeButtons = ({ entry }) => {
  // null action means no previous action
  const [action, setAction] = useState(null);
  const currentUserDoc = getCurrentUserDocument();

  const entryID = entry.id;
  const userID = entry.userid;

  // Early return or handle cases where there is no current user
  if (!currentUserDoc || !currentUserDoc.data) {
    return <p>Loading user data...</p>; // or handle the case of no user being signed in appropriately
  }

  const entryDocRef = doc(db, 'Entries', entry.id);
  const mutateEntry = useFirestoreDocumentMutation(entryDocRef, { merge: true });

  const { data: userData } = currentUserDoc;
  const userDocRef = doc(db, 'Users', userData.id);
  const mutateUser = useFirestoreDocumentMutation(userDocRef, { merge: true });

  const handleAction = (newAction) => {
    let updates = {};

    switch (newAction) {
      case LIKE:
        if (action === LIKE) {
          // unclicked like -> dec like
          if (userData.likes[entryID] === true) {
            updates = {
              [`likes.${entryID}`]: false
            };
            mutateUser.mutate(updates);
          }
          mutateEntry.mutate({
            likes: increment(-1)
          });
          setAction(null);
        } else {
          if (action === DISLIKE) {
            // switched dislike to like -> inc like, dec dislike
            mutateEntry.mutate({
              likes: increment(1),
              dislikes: increment(-1)
            });
            if (userData.dislikes[entryID] === true) {
              updates = {
                [`dislikes.${entryID}`]: false,
                [`likes.${entryID}`]: true
              };
              mutateUser.mutate(updates);
            }
          } else {
            // when action === null
            // no previous action -> inc like
            if (userData.likes[entryID] === false || userData.likes[entryID] === null) {
              updates = {
                [`likes.${entryID}`]: true
              };
              mutateUser.mutate(updates);
            }
            mutateEntry.mutate({
              likes: increment(1)
            });
          }
          setAction(LIKE);
        }
        break;
      case DISLIKE:
        if (action === DISLIKE) {
          // unclicked dislike -> dec dislike
          mutateEntry.mutate({
            dislikes: increment(-1)
          });
          setAction(null);
        } else {
          if (action === LIKE) {
            // switched like to dislike -> inc dislike, dec like
            mutateEntry.mutate({
              likes: increment(-1),
              dislikes: increment(1)
            });
          } else {
            // when action === null
            // no previous action -> inc dislike
            mutateEntry.mutate({
              dislikes: increment(1)
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
        className={`hover:text-green-500 ${action === LIKE ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleAction(LIKE)}>
        <LikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {action === LIKE ? entry.likes + 1 : entry.likes}
        </p>
      </Button>
      <Button
        className={`hover:text-red-500 ${action === DISLIKE ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction(DISLIKE)}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {action === DISLIKE ? entry.dislikes + 1 : entry.dislikes}
        </p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
