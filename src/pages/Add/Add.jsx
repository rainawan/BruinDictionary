import { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Input,
  Button
} from '@nextui-org/react';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import LoadingCard from '../Dictionary/components/LoadingCard';
import { useNavigate } from 'react-router-dom';
import { unpackTermsQuery } from '../../utils/unpackQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import getEntriesMutation from '../../utils/getEntriesMutation';
import useCurrentUserData from '../../utils/useCurrentUserData';

const Add = () => {
  const { userData } = useCurrentUserData();
  const navigate = useNavigate();
  const selectedTermId = useRef();
  const entryMutation = getEntriesMutation();

  const termsQuery = getTermsQuery();
  const { status, data } = unpackTermsQuery(termsQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let termid = selectedTermId.current;
    if (!termid) {
      // when term is a custom value
      const termname = formData.get('term').trim();
      console.log(termname);
    }

    const definition = formData.get('definition').trim();
    const example = formData.get('example').trim();
    const tags = [
      ...new Set(
        formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')
      )
    ];
    const userid = userData.userid;
    // console.log(termid, definition);

    // mutation.mutate(
    //   {
    //     termid,
    //     userid,
    //     creationDate: serverTimestamp(),
    //     definition,
    //     example,
    //     tags
    //     likes: 0,
    //     dislikes: 0,
    //   },
    //   {
    //     onSuccess: () => {
    //       toast.success('Added successfully!');
    //       navigate('/');
    //     },
    //     onError: (error) => {
    //       console.error('Mutation error:', error);
    //       toast.error('Error occured. Please try again.');
    //     },
    //     onMutate: () => {
    //       toast('Adding...');
    //     }
    //   }
    // );
  };

  if (status === 'loading') {
    return <LoadingCard />;
  } else if (status === 'error') {
    return <div>Error occurred. Try again.</div>;
  }

  return (
    <section className="max-w-[55rem]">
      <Card className="px-2 py-4">
        <form id="add-form" onSubmit={handleSubmit}>
          <CardHeader className="justify-center">
            <p className="font-bold">New Definition</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Autocomplete
              isRequired
              allowsCustomValue
              className="max-w-xs"
              aria-label="term-select"
              name="term"
              label="Term"
              labelPlacement="outside"
              placeholder="Select a term"
              defaultItems={Object.entries(data)}
              onSelectionChange={(key) => {
                selectedTermId.current = key;
              }}
              popoverProps={{
                classNames: {
                  content: 'dark:dark'
                }
              }}>
              {([termid, termname]) => (
                <AutocompleteItem key={termid} textValue={termname}>
                  {termname}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Textarea
              isRequired
              name="definition"
              label="Definition"
              labelPlacement="outside"
              placeholder="Your definition of the term"
            />
            <Textarea
              isRequired
              minRows={2}
              name="example"
              label="Example"
              labelPlacement="outside"
              placeholder="An example of how it's used in sentence"
            />
            <Input
              name="tags"
              label="Tags"
              labelPlacement="outside"
              placeholder="A list of comma-seperated tags"
            />
            <Button disabled={entryMutation.isLoading} color="primary" name="submit" type="submit">
              Submit
            </Button>
          </CardBody>
        </form>
      </Card>
    </section>
  );
};

export default Add;
