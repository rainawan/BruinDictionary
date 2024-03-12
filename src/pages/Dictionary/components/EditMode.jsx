import { Button, Textarea } from '@nextui-org/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import getEditEntriesMutation from '../../../utils/getEditEntriesMutation';

const EditMode = ({ entry, setEditEntryid }) => {
  const navigate = useNavigate();
  const mutation = getEditEntriesMutation(entry.id);

  const handleEditCancel = () => {
    setEditEntryid(undefined);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const definition = formData.get('definition');
    const example = formData.get('example');

    // TODO: handle edit confirm
    console.log(definition, example);
    console.log(mutation);

    if (definition === '' || example === '') {
      toast.error('Missing required input...');
    } else {
      mutation.mutate(
        {
          ...entry,
          definition: definition.trim(),
          example: example.trim()
        },
        {
          onSuccess: () => {
            toast.success('Updated successfully!');
            setEditEntryid(undefined);
            navigate(0);
          },
          onError: (error) => {
            console.error('Mutation error:', error);
            toast.error('Error occured. Please try again.');
          },
          onMutate: () => {
            toast('Updating...');
          }
        }
      );
    }
  };

  return (
    <form id="dictionary-edit" onSubmit={handleEditSubmit}>
      <Textarea
        isRequired
        minRows={1}
        maxRows={4}
        size="sm"
        name="definition"
        defaultValue={entry.definition}
        classNames={{ inputWrapper: 'ring-error' }}
      />
      <p className="mt-3 mb-1 md:text-lg font-medium">Example</p>
      <Textarea
        isRequired
        minRows={1}
        maxRows={4}
        size="sm"
        name="example"
        defaultValue={entry.example}
        classNames={{ inputWrapper: 'ring-error' }}
      />
      <div className="mt-5 inline-flex flex-row gap-1">
        <Button
          className="text-white bg-blue-800 dark:text-black dark:bg-yellow-200"
          name="submit"
          type="submit">
          Update
        </Button>
        <Button variant="ghost" color="danger" onClick={handleEditCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditMode;
