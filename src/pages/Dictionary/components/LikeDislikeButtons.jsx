import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const LikeDislikeButtons = ({ entry }) => {
  // action can be either 'like' or 'dislike'
  const [action, setAction] = useState(null);

  const handleAction = (newAction) => {
    // TODO: update firebase with new action
    switch (newAction) {
      case 'like':
        if (action === 'like') {
          // unclicked like -> dec like
        } else if (action === 'dislike') {
          // switched dislike to like -> inc like, dec dislike
        } else {
          // no previous action -> inc like
        }
        break;
      case 'dislike':
        if (action === 'dislike') {
          // unclicked dislike -> dec dislike
        } else if (action === 'like') {
          // switched like to dislike -> inc dislike, dec like
        } else {
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
        className={`hover:text-green-500 ${action === 'like' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleAction('like')}>
        <LikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {action === 'like' ? entry.likes + 1 : entry.likes}
        </p>
      </Button>
      <Button
        className={`hover:text-red-500 ${action === 'dislike' ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction('dislike')}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {action === 'dislike' ? entry.dislikes + 1 : entry.dislikes}
        </p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
