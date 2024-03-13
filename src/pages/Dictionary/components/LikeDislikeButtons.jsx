import { useState, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { doc, increment, onSnapshot } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { db } from '../../../utils/firebase.js';
import useCurrentUserData from '../../../utils/useCurrentUserData.js';
import getUserMutation from '../../../utils/getUserMutation.js';
import getEditEntriesMutation from '../../../utils/getEditEntriesMutation.js';

const LIKE = true;
const DISLIKE = false;

const LikeDislikeButtons = ({ entry }) => {
  // null action means no previous action
  const [action, setAction] = useState(null);
  const { userData } = useCurrentUserData();

  const userDoc = userData ? doc(db, 'Users', userData.userid) : null;
  const mutateUser = getUserMutation(userData.userid);
  const mutateEntry = getEditEntriesMutation(entry.id);

  const likeCount = useRef(entry.likes);
  const dislikeCount = useRef(entry.dislikes);

  if (!userData) {
    // if not logged in
    return (
      <div className="inline-flex flex-row gap-1">
        <Button className={'hover:text-green-500'} onClick={null}>
          <LikeFilled className="text-lg" />
          <p className="text-black dark:text-white">{likeCount}</p>
        </Button>
        <Button className={'hover:text-red-500'} onClick={null}>
          <DislikeFilled className="text-lg" />
          <p className="text-black dark:text-white">{likeCount}</p>
        </Button>
      </div>
    );
  }

  const handleAction = (newAction) => {
    // const updateUser = {
    //   // Initialize or retain existing likes/dislikes structure
    //   likes: userDoc.likes || {},
    //   dislikes: userDoc.dislikes || {}
    // };

    switch (newAction) {
      case LIKE:
        if (action === LIKE || userDoc.likes[entry.id] === true) {
          // unclicked like -> dec like
          mutateEntry.mutate({
            likes: increment(-1)
          });

          // updateUser.likes[entry.id] = false;
          mutateUser.mutate({
            likes: { [entry.id]: false }
          });

          setAction(null);
        } else {
          if (action === DISLIKE || userDoc.dislikes[entry.id] === true) {
            // switched dislike to like -> inc like, dec dislike
            mutateEntry.mutate({
              likes: increment(1),
              dislikes: increment(-1)
            });

            // updateUser.likes[entry.id] = true;
            // updateUser.dislikes[entry.id] = false;
            mutateUser.mutate({
              likes: { [entry.id]: true },
              dislikes: { [entry.id]: false }
            });
          } else {
            // when action === null
            // no previous action -> inc like
            mutateEntry.mutate({
              likes: increment(1)
            });

            // updateUser.likes[entry.id] = true;
            mutateUser.mutate({
              likes: { [entry.id]: true }
            });
          }
          setAction(LIKE);
        }
        break;
      case DISLIKE:
        if (action === DISLIKE || userDoc.dislikes[entry.id] === true) {
          // unclicked dislike -> dec dislike
          mutateEntry.mutate({
            dislikes: increment(-1)
          });

          // updateUser.dislikes[entry.id] = false;
          mutateUser.mutate({
            dislikes: { [entry.id]: false }
          });

          setAction(null);
        } else {
          if (action === LIKE || userDoc.likes[entry.id] === true) {
            // switched like to dislike -> inc dislike, dec like
            mutateEntry.mutate({
              likes: increment(-1),
              dislikes: increment(1)
            });

            // updateUser.dislikes[entry.id] = true;
            // updateUser.likes[entry.id] = false;
            mutateUser.mutate({
              likes: { [entry.id]: false },
              dislikes: { [entry.id]: true }
            });
          } else {
            // when action === null
            // no previous action -> inc dislike
            mutateEntry.mutate({
              dislikes: increment(1)
            });

            // updateUser.dislikes[entry.id] = true;
            mutateUser.mutate({
              dislikes: { [entry.id]: false }
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
        <p className="text-black dark:text-white">{likeCount}</p>
      </Button>
      <Button
        className={`hover:text-red-500 ${userDoc.dislikes && userDoc.dislikes[entry.id] ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction(DISLIKE)}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">{dislikeCount}</p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
