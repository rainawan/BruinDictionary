import { Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import {
  incrementLikes,
  incrementDislikes,
  decrementDislikes,
  decrementLikes
} from '../../../utils/firebaseOperations';
import { useState } from 'react';

const DisplayMode = ({ entry }) => {
  const [likes, setLikes] = useState(entry.likes);
  const [dislikes, setDislikes] = useState(entry.dislikes);
  const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null

  const handleLike = async () => {
    if (userAction !== 'liked') {
      setLikes((prevLikes) => prevLikes + 1);
      // If the user had previously disliked the entry, adjust the dislikes count too
      if (userAction === 'disliked') {
        setDislikes((prevDislikes) => prevDislikes - 1);
        await decrementDislikes(entry.id);
      }
      setUserAction('liked');
      await incrementLikes(entry.id);
    } else if (userAction === 'liked') {
      setLikes((prevLikes) => prevLikes - 1);
      setUserAction(null);
      await decrementLikes(entry.id);
    }
  };

  const handleDislike = async () => {
    if (userAction !== 'disliked') {
      setDislikes((prevDislikes) => prevDislikes + 1);
      // If the user had previously liked the entry, adjust the likes count too
      if (userAction === 'liked') {
        setLikes((prevLikes) => prevLikes - 1);
        await decrementLikes(entry.id);
      }
      setUserAction('disliked');
      await incrementDislikes(entry.id);
    } else if (userAction === 'disliked') {
      setDislikes((prevDislikes) => prevDislikes - 1);
      setUserAction(null);
      await decrementDislikes(entry.id);
    }
  };

  return (
    <>
      <p className="md:text-lg">{entry.definition}</p>
      <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
      <p className="italic md:text-lg">{entry.example}</p>
      <div className="mt-5 inline-flex flex-row gap-1">
        <Button className="hover:bg-blue-800 hover:text-white" onClick={handleLike}>
          <LikeFilled className="text-lg" />
          <p className="text-sm">{likes}</p>
        </Button>
        <Button className="hover:bg-red-800 hover:text-white" onClick={handleDislike}>
          <DislikeFilled className="text-lg" />
          <p className="text-sm">{dislikes}</p>
        </Button>
      </div>
    </>
  );
};

export default DisplayMode;

// import { Button } from '@nextui-org/react';
// import { LikeFilled, DislikeFilled } from '@ant-design/icons';
// import { updateLikes, updateDislikes } from '../../../utils/firebaseOperations';
// import { useState } from 'react';

// const DisplayMode = ({ entry }) => {
//   const [likes, setLikes] = useState(entry.likes);
//   const [dislikes, setDislikes] = useState(entry.dislikes);
//   const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null

//   const handleLike = async () => {
//     if (userAction !== 'liked') {
//       setLikes((prevLikes) => prevLikes + 1);
//       setUserAction('liked');
//       // If the user had previously disliked the entry, adjust the dislikes count too
//       if (userAction === 'disliked') {
//         setDislikes((prevDislikes) => prevDislikes - 1);
//       }
//       await updateLikes(entry.id);
//     }
//   };

//   const handleDislike = async () => {
//     if (userAction !== 'disliked') {
//       setDislikes((prevDislikes) => prevDislikes + 1);
//       setUserAction('disliked');
//       // If the user had previously liked the entry, adjust the likes count too
//       if (userAction === 'liked') {
//         setLikes((prevLikes) => prevLikes - 1);
//       }
//       await updateDislikes(entry.id);
//     }
//   };

//   return (
//     <>
//       <p className="md:text-lg">{entry.definition}</p>
//       <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
//       <p className="italic md:text-lg">{entry.example}</p>
//       <div className="mt-5 inline-flex flex-row gap-1">
//         <Button className="hover:bg-blue-800 hover:text-white" onClick={handleLike}>
//           <LikeFilled className="text-lg" />
//           <p className="text-sm">{likes}</p>
//         </Button>
//         <Button className="hover:bg-red-800 hover:text-white" onClick={handleDislike}>
//           <DislikeFilled className="text-lg" />
//           <p className="text-sm">{dislikes}</p>
//         </Button>
//       </div>
//     </>
//   );
// };

// export default DisplayMode;
