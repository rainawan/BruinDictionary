import { useRef } from 'react';
import { Button, Textarea, useDisclosure } from '@nextui-org/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import getEditEntriesMutation from '../../../utils/getEditEntriesMutation';
import EditConfirmModal from './EditConfirmModel';

const EditMode = ({ entry, setEditEntryid, termName, userid }) => {
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
    const formData = new FormData(e.target);
    definition.current.value = formData.get('definition');
    example.current.value = formData.get('example');

    onOpen();
  };

  const handleEditSubmit = () => {
    const definitionTrim = definition.current.value.trim();
    const exampleTrim = example.current.value.trim();

    console.log(definitionTrim, exampleTrim);

    if (definitionTrim === '' || exampleTrim === '') {
      toast.error('Missing required input...');
    } else {
      mutation.mutate(
        {
          definition: definitionTrim,
          example: exampleTrim
        },
        {
          onSuccess: () => {
            toast.success('Updated successfully!');
            setEditEntryid(undefined);
            navigate(`/?term=${termName}&userid=${userid}`);
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
      <form id="dictionary-edit" onSubmit={handleUpdate}>
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
            type="submit">
            Update
          </Button>
          <Button variant="ghost" color="danger" onClick={handleEditCancel}>
            Cancel
          </Button>
        </div>
        {isOpen && (
          <EditConfirmModal
            entryid={entry.id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            handleSubmit={handleEditSubmit}
          />
        )}
      </form>
    </>
  );
};

export default EditMode;
