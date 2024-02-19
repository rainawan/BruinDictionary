import { useSearchParams } from 'react-router-dom';
import { fetchEntries, fetchTerms, fetchUsers } from '../utils/fetchData';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term')?.toLowerCase();

  const entries = fetchEntries();
  const terms = fetchTerms();
  const users = fetchUsers();
  console.log('entries: ', entries, '\nterms: ', terms, '\nusers: ', users);

  return (
    <div className="Terms">
      {entries && terms && users ? (
        entries.map((entry, index) => (
          <div key={index}>
            <h2>{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Dictionary;
