import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import getEntriesMutation from '../../../utils/getEntriesMutation';

const useEntryAddition = () => {
  const entryMutation = getEntriesMutation();
  const navigate = useNavigate();

  const addEntry = ({ termid, userid, definition, example, tags, name }) => {
    entryMutation.mutate(
      {
        termid,
        userid,
        creationDate: serverTimestamp(),
        definition,
        example,
        tags,
        likes: 0,
        dislikes: 0
      },
      {
        onMutate: () => {
          toast('Adding...');
        },
        onSuccess: () => {
          toast.success('Added successfully!');
          navigate(`/?term=${name}&userid=${userid}`);
          navigate(0);
        },
        onError: (error) => {
          console.error('Mutation error:', error);
          toast.error('Error occured. Please try again.');
        }
      }
    );
  };

  return addEntry;
};

export default useEntryAddition;
