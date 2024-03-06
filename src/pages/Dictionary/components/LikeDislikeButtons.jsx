import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const LIKE = true;
const DISLIKE = false;

const LikeDislikeButtons = ({ entry }) => {
  // action can be either LIKE or DISLIKE, null means no previous action
  const [action, setAction] = useState(null);

  const handleAction = (newAction) => {
    // TODO: update firebase with new action
    switch (newAction) {
      case LIKE:
        if (action === LIKE) {
          // unclicked like -> dec like
        } else if (action === DISLIKE) {
          // switched dislike to like -> inc like, dec dislike
        } else {
          // when action === null
          // no previous action -> inc like
        }
        break;
      case DISLIKE:
        if (action === DISLIKE) {
          // unclicked dislike -> dec dislike
        } else if (action === LIKE) {
          // switched like to dislike -> inc dislike, dec like
        } else {
          // when action === null
          // no previous action -> inc dislike
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
