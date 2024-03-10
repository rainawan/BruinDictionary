import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { doc } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase.js';

const LIKE = 'true';
const DISLIKE = 'false';

const LikeDislikeButtons = ({ entry }) => {
  // null action means no previous action
  const [action, setAction] = useState(localStorage.getItem(entry.id));

  const entryDocRef = doc(db, 'Entries', entry.id);

  const mutation = useFirestoreDocumentMutation(entryDocRef, { merge: true });

  const handleAction = (newAction) => {
    // TODO: update firebase with new action
    switch (newAction) {
      case LIKE:
        if (action === LIKE) {
          // unclicked like -> dec like
          localStorage.removeItem(entry.id);
          mutation.mutate({
            likes: entry.likes - 1
          });
          setAction(null);
        } else {
          if (action === DISLIKE) {
            // switched dislike to like -> inc like, dec dislike
            mutation.mutate({
              likes: entry.likes + 1,
              dislikes: entry.dislikes - 1
            });
          } else {
            mutation.mutate({
              likes: entry.likes + 1
            });
          }
          localStorage.setItem(entry.id, LIKE);
          setAction(LIKE);
        }
        break;
      case DISLIKE:
        if (action === DISLIKE) {
          // unclicked dislike -> dec dislike
          localStorage.removeItem(entry.id);
          mutation.mutate({
            dislikes: entry.dislikes - 1
          });
          setAction(null);
        } else {
          if (action === LIKE) {
            // switched like to dislike -> inc dislike, dec like
            mutation.mutate({
              likes: entry.likes - 1,
              dislikes: entry.dislikes + 1
            });
            setAction(DISLIKE);
          } else {
            // when action === null
            // no previous action -> inc dislike
            mutation.mutate({
              dislikes: entry.dislikes + 1
            });
          }
          localStorage.setItem(entry.id, DISLIKE);
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
        className={`hover:text-green-500 ${localStorage.getItem(entry.id) === LIKE ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleAction(LIKE)}>
        <LikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {localStorage.getItem(entry.id) === LIKE ? entry.likes + 1 : entry.likes}
        </p>
      </Button>
      <Button
        className={`hover:text-red-500 ${localStorage.getItem(entry.id) === DISLIKE ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction(DISLIKE)}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {localStorage.getItem(entry.id) === DISLIKE ? entry.dislikes + 1 : entry.dislikes}
        </p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
