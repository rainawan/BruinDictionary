import FlagButton from './FlagButton';
import LikeDislikeButtons from './LikeDislikeButtons';

const DisplayMode = ({ entry }) => {
  return (
    <>
      <p className="md:text-lg">{entry.definition}</p>
      <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
      <p className="italic md:text-lg">{entry.example}</p>
      <div className="mt-5 inline-flex flex-row flex-wrap place-content-between w-full">
        <LikeDislikeButtons entry={entry} />
        {/* <FlagButton entryid={entry.id} /> */}
      </div>
    </>
  );
};

export default DisplayMode;
