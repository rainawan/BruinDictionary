import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const LIKE = 'true';
const DISLIKE = 'false';

const LikeDislikeButtons = ({ entry }) => {
  // null means no previous action
  const [action, setAction] = useState(localStorage.getItem(entry.id));

  const handleAction = (newAction) => {
    // TODO: update firebase with new action
    switch (newAction) {
      case LIKE:
        if (action === LIKE) {
          // unclicked like -> dec like
          localStorage.removeItem(entry.id);
        } else if (action === DISLIKE) {
          // switched dislike to like -> inc like, dec dislike
          localStorage.setItem(entry.id, LIKE);
        } else {
          // when currA=== null
          // no previous action -> inc like
          localStorage.setItem(entry.id, LIKE);
        }
        break;
      case DISLIKE:
        if (action === DISLIKE) {
          // unclicked dislike -> dec dislike
          localStorage.removeItem(entry.id);
        } else if (action === LIKE) {
          // switched like to dislike -> inc dislike, dec like
          localStorage.setItem(entry.id, DISLIKE);
        } else {
          // when action === null
          // no previous action -> inc dislike
          localStorage.setItem(entry.id, DISLIKE);
        }
        break;
      default:
        break;
    }

    setAction((prevAction) => (prevAction === newAction ? null : newAction));
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
