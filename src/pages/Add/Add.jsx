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
import LoadingCard from '../Dictionary/components/LoadingCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { unpackTermsQuery } from '../../utils/unpackQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import getEntriesMutation from '../../utils/getEntriesMutation';
import useCurrentUserData from '../../utils/useCurrentUserData';
import Text from '../../components/Text';

const Add = () => {
  const { userData } = useCurrentUserData();

  const termSelectBox = useRef();
  const definitionTextArea = useRef();
  const exampleInput = useRef();
  const tagInput = useRef();

  const navigate = useNavigate();

  const termsQuery = getTermsQuery();
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);

  const mutation = getEntriesMutation();

  const handleSubmit = () => {
    const definition = definitionTextArea.current.value.trim();
    const example = exampleInput.current.value.trim();
    const termSelect = termSelectBox.current.value.trim();
    const tags = tagInput.current.value.split(',').map((tag) => tag.trim());

    if (definition === '' || example === '' || termSelect === '') {
      toast.error('Missing required input...');
    } else {
      mutation.mutate(
        {
          creationDate: serverTimestamp(),
          definition: definition,
          example: example,
          termid: termSelect,
          userid: userData.userid,
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
    }
  };

  return (
    <section className="max-w-[55rem] pt-10">
      {termsStatus === 'success' ? (
        <Card className="dark:bg-slate-600 p-4">
          <CardHeader className="flex-col">
            <Text h1 className="font-semibold">
              New Definition
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="my-5 flex gap-4">
              <Select
                isRequired
                label="Select a term"
                className="max-w-xs, w-full"
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
              <Input
                label="Tags"
                className="w-full"
                placeholder="Type a list of comma-seperated tags..."
                ref={tagInput}
              />
            </div>
            <Textarea
              isRequired
              label="Definition"
              className="my-5"
              placeholder="Type your definition here..."
              ref={definitionTextArea}
            />
            <Input
              isRequired
              label="Example"
              className="my-5"
              placeholder="Type an example of how it's used in sentence..."
              ref={exampleInput}
            />
            <Button disabled={mutation.isLoading} color="primary" onClick={handleSubmit}>
              Post
            </Button>
          </CardBody>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </section>
  );
};

export default Add;
