import { useSearchParams } from 'react-router-dom';
import { unpackEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getEntriesQuery from '../../utils/getEntriesQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import CardLoading from './components/CardLoading';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term !== undefined ? term.toLowerCase() : undefined;

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const termid = searchTerm && terms ? Object.keys(terms)[0] : undefined;

  const entriesQuery = getEntriesQuery({ termid, ...search });
  const { status: entriesStatus, data: entries } = unpackEntriesQuery(entriesQuery);
  console.log('entries: ', entries, '\nterms: ', terms);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);

  if (status === 'loading') {
    return <CardLoading />;
  } else if (status === 'error') {
    return <div>error occurred</div>;
  } else if (Object.keys(terms)?.length === 0 || entries?.length === 0) {
    return <div>not found</div>;
  } else if (status === 'success') {
    return (
      <div className="Terms">
        {entries.map((entry, index) => (
          <div key={index}>
            <h2 className="font-hl font-bold">{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
