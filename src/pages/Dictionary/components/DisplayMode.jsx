import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const DisplayMode = ({ entry }) => {
  return (
    <>
      <p className="text-md md:text-lg">{entry.definition}</p>
      <p className="mt-3 mb-1 text-md md:text-lg font-medium">Example</p>
      <p className="italic text-md md:text-l">{entry.example}</p>
      <div className="mt-5 inline-flex flex-row gap-1">
        <Button className="hover:bg-blue-800 hover:text-white">
          <LikeFilled className="text-lg" />
          <p className="text-sm">{entry.likes}</p>
        </Button>
        <Button className="hover:bg-red-800 hover:text-white">
          <DislikeFilled className="text-lg" />
          <p className="text-sm">{entry.dislikes}</p>
        </Button>
      </div>
    </>
  );
};

export default DisplayMode;
