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
import LoadingCard from '../Dictionary/components/LoadingCard';
import { unpackTermsQuery } from '../../utils/unpackQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import useCurrentUserData from '../../utils/useCurrentUserData';
import useTermsMutation from '../../utils/useTermsMutation';
import useEntryMutation from './hooks/useEntryMutation';

const Add = () => {
  const selectedTermId = useRef();
  const { userData } = useCurrentUserData();
  const termMutation = useTermsMutation();
  const entryMutation = useEntryMutation();

  const termsQuery = getTermsQuery();
  const { status, data } = unpackTermsQuery(termsQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userid = userData.userid;
    const name = formData.get('term').trim();
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

    let termid =
      selectedTermId.current ||
      Object.keys(data).find((key) => data[key].toLowerCase() === name.toLowerCase());
    if (!termid) {
      // when term is a custom value, add term and then add entry
      termMutation.mutate(
        {
          name,
          termname: name.toLowerCase()
        },
        {
          onSuccess: (data) => {
            termid = data.id;
            entryMutation({ termid, userid, definition, example, tags, name });
          }
        }
      );
    } else {
      entryMutation({ termid, userid, definition, example, tags, name });
    }
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
              disabled={!termMutation.isSuccess}
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
            <Button
              disabled={entryMutation.isLoading || termMutation.isLoading}
              color="primary"
              name="submit"
              type="submit">
              Submit
            </Button>
          </CardBody>
        </form>
      </Card>
    </section>
  );
};

export default Add;
