import { useRef } from 'react';
import { Button, Textarea } from '@nextui-org/react';

const EditMode = ({ entry, setEditEntryid }) => {
  const newDefinition = useRef(entry.definition);
  const newExample = useRef(entry.example);

  const handleEditCancel = () => {
    setEditEntryid(undefined);
  };

  const handleEditSubmit = () => {
    // TODO: handle edit confirm
    console.log(newDefinition.current, newExample.current);
  };

  return (
    <>
      <Textarea
        minRows={1}
        maxRows={4}
        defaultValue={entry.definition}
        onValueChange={(value) => {
          newDefinition.current = value;
        }}
      />
      <p className="mt-3 mb-1 text-md md:text-lg font-medium">Example</p>
      <Textarea
        minRows={1}
        maxRows={4}
        defaultValue={entry.example}
        onValueChange={(value) => {
          newExample.current = value;
        }}
      />
      <div className="mt-5 inline-flex flex-row gap-1">
        <Button
          className="text-white bg-blue-800 dark:text-black dark:bg-yellow-200"
          onClick={handleEditSubmit}>
          Update
        </Button>
        <Button variant="ghost" color="danger" onClick={handleEditCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditMode;
