import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import useTermsMutation from '../../../utils/useTermsMutation';
import useEntriesMutation from '../../../utils/getEntriesMutation';

const useEntryAddition = () => {
  const termMutation = useTermsMutation();
  const entryMutation = useEntriesMutation();
  const navigate = useNavigate();

  const addEntry = ({ termid, userid, definition, example, tags, name }) => {
    const entryField = {
      termid,
      userid,
      creationDate: serverTimestamp(),
      definition,
      example,
      tags,
      likes: 0,
      dislikes: 0
    };
    const entryOption = {
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
    };

    if (!termid) {
      // when term is a custom value, add term and then add entry
      termMutation.mutate(
        {
          name,
          termname: name.toLowerCase()
        },
        {
          onSuccess: (data) => {
            entryMutation.mutate({ ...entryField, termid: data.id }, entryOption);
          }
        }
      );
    } else {
      entryMutation.mutate(entryField, entryOption);
    }
  };

  return addEntry;
};

export default useEntryAddition;
