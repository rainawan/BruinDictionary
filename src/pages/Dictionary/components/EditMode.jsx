import { useRef } from 'react';
import { Button, Textarea, useDisclosure } from '@nextui-org/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import getEditEntriesMutation from '../../../utils/getEditEntriesMutation';
import EditConfirmModal from './EditConfirmModel';

const EditMode = ({ entry, setEditEntryid }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const definition = useRef(entry.definition);
  const example = useRef(entry.example);

  const navigate = useNavigate();
  const mutation = getEditEntriesMutation(entry.id);

  const handleEditCancel = () => {
    setEditEntryid(undefined);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onOpen();
  };

  const handleEditSubmit = () => {
    const definitionTrim = definition.current.value.trim();
    const exampleTrim = example.current.value.trim();

    if (definitionTrim === '' || exampleTrim === '') {
      toast.error('Missing required input...');
    } else {
      mutation.mutate(
        {
          ...entry,
          definition: definitionTrim,
          example: exampleTrim
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
    <>
      <form id="dictionary-edit">
        <Textarea
          isRequired
          minRows={1}
          maxRows={4}
          size="sm"
          name="definition"
          defaultValue={entry.definition}
          ref={definition}
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
          ref={example}
          classNames={{ inputWrapper: 'ring-error' }}
        />
        <div className="mt-5 inline-flex flex-row gap-1">
          <Button
            className="text-white bg-blue-800 dark:text-black dark:bg-yellow-200"
            name="submit"
            type="submit"
            onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" color="danger" onClick={handleEditCancel}>
            Cancel
          </Button>
        </div>
      </form>
      {isOpen && (
        <EditConfirmModal
          entryid={entry.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default EditMode;
