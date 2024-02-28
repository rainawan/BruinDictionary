import { Button, Textarea } from '@nextui-org/react';

const EditMode = ({ entry, setEditEntryid }) => {
  const handleEditCancel = () => {
    setEditEntryid(undefined);
  };

  const handleEditConfirm = () => {
    // TODO: handle edit confirm
  };

  return (
    <>
      <Textarea defaultValue={entry.definition} minRows={1} maxRows={4} />
      <p className="mt-3 mb-1 text-md md:text-lg font-medium">Example</p>
      <Textarea defaultValue={entry.example} minRows={1} maxRows={4} />
      <div className="mt-5 inline-flex flex-row gap-1">
        <Button variant="light" onClick={handleEditConfirm}>
          Confirm
        </Button>
        <Button className="hover:bg-red-800" onClick={handleEditCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditMode;
