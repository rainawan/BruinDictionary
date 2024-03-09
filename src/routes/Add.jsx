import { useRef } from 'react';
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Textarea,
  Button
} from '@nextui-org/react';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import LoadingCard from '../pages/Dictionary/components/LoadingCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { unpackTermsQuery } from '../utils/unpackQuery';
import getTermsQuery from '../utils/getTermsQuery';
import getEntriesMutation from '../utils/getEntriesMutation';

const Add = () => {
  const termSelectBox = useRef();
  const definitionTextArea = useRef();
  const exampleInput = useRef();
  const tagInput = useRef();

  const navigate = useNavigate();

  const termsQuery = getTermsQuery();
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);

  const mutation = getEntriesMutation();

  const handleSubmit = () => {
    const tags = tagInput.current.value.split(',').map((tag) => tag.trim());

    mutation.mutate(
      {
        creationDate: serverTimestamp(),
        definition: definitionTextArea.current.value,
        example: exampleInput.current.value,
        termid: termSelectBox.current.value,
        likes: 0,
        dislikes: 0,
        tags: tags
      },
      {
        onSuccess: () => {
          toast.success('Added successfully!');
          navigate('/');
        },
        onError: (error) => {
          console.error('Mutation error:', error);
          toast.error('Error occured. Please try again.');
        },
        onMutate: () => {
          toast('Adding...');
        }
      }
    );
  };

  return (
    <section className="max-w-[55rem]">
      {termsStatus === 'success' ? (
        <Card className="py-4">
          <CardHeader className="flex-col">
            <p className="font-bold">New Definition</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="my-5">
              <Select
                label="Select a term"
                className="max-w-xs"
                ref={termSelectBox}
                popoverProps={{
                  classNames: {
                    content: 'dark:dark'
                  }
                }}>
                {Object.keys(terms).map((key, index) => (
                  <SelectItem key={key} value={terms[key]}>
                    {terms[key]}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Textarea
              className="my-5"
              placeholder="Type your definition here..."
              ref={definitionTextArea}
            />
            <Input
              className="my-5"
              placeholder="Type an example of how it's used in sentence..."
              ref={exampleInput}
            />
            <Input
              className="my-5"
              placeholder="Type a list of comma-seperated tags..."
              ref={tagInput}
            />
            <Button disabled={mutation.isLoading} color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <div className="my-5">{mutation.isError && <p>{mutation.error.message}</p>}</div>
          </CardBody>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </section>
  );
};

export default Add;
