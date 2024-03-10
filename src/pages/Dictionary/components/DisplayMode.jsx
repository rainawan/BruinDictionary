import FlagButton from './FlagButton';
import LikeDislikeButtons from './LikeDislikeButtons';

const DisplayMode = ({ entry }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const prevAction = useRef(null);

  const entryDocRef = doc(db, 'Entries', entry.id);

  const mutation = useFirestoreDocumentMutation(entryDocRef, { merge: true });

  const handleLike = () => {
    setLike(prevAction.current !== 'like');

    if (prevAction.current === 'dislike') {
      setDislike(false);
      mutation.mutate({
        dislikes: prevAction.current === 'like' ? entry.dislikes - 1 : entry.dislikes
      });
    }

    mutation.mutate({
      likes: prevAction.current !== 'like' ? entry.likes + 1 : entry.likes
    });

    prevAction.current = prevAction.current !== 'like' ? 'like' : null;
  };

  const handleDislike = () => {
    setDislike(prevAction.current !== 'dislike');

    if (prevAction.current === 'like') {
      setLike(false);
      mutation.mutate({
        likes: prevAction.current === 'dislike' ? entry.likes - 1 : entry.likes
      });
    }

    mutation.mutate({
      dislikes: prevAction.current !== 'dislike' ? entry.dislikes + 1 : entry.dislikes
    });

    prevAction.current = prevAction.current !== 'dislike' ? 'dislike' : null;
  };

  return (
    <>
      <p className="md:text-lg">{entry.definition}</p>
      <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
      <p className="italic md:text-lg">{entry.example}</p>
      <div className="mt-5 inline-flex flex-row flex-wrap place-content-between w-full">
        <LikeDislikeButtons entry={entry} />
        <FlagButton entryid={entry.id} />
      </div>
    </>
  );
};

export default DisplayMode;
