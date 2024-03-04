import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import FlagButton from './FlagButton';

const DisplayMode = ({ entry }) => {
  const [feedback, setFeedback] = useState({ like: false, dislike: false });

  const handleClick = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: !prevFeedback[type]
    }));
  };

  return (
    <>
      <p className="md:text-lg">{entry.definition}</p>
      <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
      <p className="italic md:text-lg">{entry.example}</p>
      <div className="mt-5 inline-flex flex-row flex-wrap place-content-between w-full">
        <div className="inline-flex flex-row gap-1">
          <Button
            className={`hover:text-green-500 ${feedback.like ? 'bg-green-500 text-white' : ''}`}
            onClick={() => handleClick('like')}>
            <LikeFilled className="text-lg" />
            <p className="text-black dark:text-white">{entry.likes}</p>
          </Button>
          <Button
            className={`hover:text-red-500 ${feedback.dislike ? 'bg-red-500 text-white' : ''}`}
            onClick={() => handleClick('dislike')}>
            <DislikeFilled className="text-lg" />
            <p className="text-black dark:text-white">{entry.dislikes}</p>
          </Button>
        </div>
        <FlagButton entryid={entry.id} />
      </div>
    </>
  );
};

export default DisplayMode;
