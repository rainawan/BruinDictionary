import { useState, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const LikeDislikeButtons = ({ entry }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const prevAction = useRef(null);

  const handleAction = (action) => {
    const oppositeAction = action === 'like' ? 'dislike' : 'like';
    if (prevAction.current === oppositeAction) {
      if (oppositeAction === 'like') {
        setLike(false);
      } else {
        setDislike(false);
      }
    }

    if (action === 'like') {
      setLike(prevAction.current !== 'like');
    } else {
      setDislike(prevAction.current !== 'dislike');
    }

    prevAction.current = prevAction.current !== action ? action : null;
  };

  return (
    <div className="inline-flex flex-row gap-1">
      <Button
        className={`hover:text-green-500 ${like ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleAction('like')}>
        <LikeFilled className="text-lg" />
        <p className="text-black dark:text-white">{like ? entry.likes + 1 : entry.likes}</p>
      </Button>
      <Button
        className={`hover:text-red-500 ${dislike ? 'bg-red-500 text-white' : ''}`}
        onClick={() => handleAction('dislike')}>
        <DislikeFilled className="text-lg" />
        <p className="text-black dark:text-white">
          {dislike ? entry.dislikes + 1 : entry.dislikes}
        </p>
      </Button>
    </div>
  );
};

export default LikeDislikeButtons;
