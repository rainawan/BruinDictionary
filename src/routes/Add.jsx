import { useState } from 'react';
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
import LoadingCard from '../pages/Dictionary/components/LoadingCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { unpackTermsQuery } from '../utils/unpackQuery';
import getTermsQuery from '../utils/getTermsQuery';
import getEntriesMutation from '../utils/getEntriesMutation';

const Add = () => {
  const [termSelectBox, setTermSelectBox] = useState('');
  const [definitionTextArea, setDefinitionTextArea] = useState('');
  const [exampleInput, setExampleInput] = useState('');
  const [tagInput, setTagInput] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term !== undefined ? term.toLowerCase() : undefined;

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);

  const mutation = getEntriesMutation();

  const handleTermSelectionChange = (e) => {
    setTermSelectBox(e.target.value);
  };

  const handleDefinitionTextAreaChange = (e) => {
    setDefinitionTextArea(e.target.value);
  };

  const handleExampleInputChange = (e) => {
    setExampleInput(e.target.value);
  };

  const handleTagInputChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setTagInput(tags);
  };

  const handleSubmit = () => {
    mutation.mutate(
      {
        creationDate: serverTimestamp(),
        definition: definitionTextArea,
        example: exampleInput,
        termid: termSelectBox,
        likes: 0,
        dislikes: 0,
        tags: tagInput
      },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (error) => {
          console.error('Mutation error:', error);
          // should add an alert...
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
                onChange={handleTermSelectionChange}>
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
              onChange={handleDefinitionTextAreaChange}
            />
            <Input
              className="my-5"
              placeholder="Type an example of how it's used in sentence..."
              onChange={handleExampleInputChange}
            />
            <Input
              className="my-5"
              placeholder="type a list of comma-seperated tags..."
              onChange={handleTagInputChange}
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
