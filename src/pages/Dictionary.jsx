import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchTermEntries } from '../utils/fetchData';

const Dictionary = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term');
  console.log('location: ', location, '\nsearch term: ', searchTerm);

  const { status, data } = fetchTermEntries();

  if (status == 'SUCCESS') {
    const { entries, terms } = data;
    return (
      <div className="Terms">
        {entries.map((entry, index) => (
          <div key={index}>
            <h2>{terms[entry.termid]}</h2>
            <h3>Definition</h3>
            <p>{entry.definition}</p>
            <h3>Example</h3>
            <p>{entry.example}</p>
            <br />
          </div>
        ))}
      </div>
    );
  } else if (status == 'LOADING') {
    return <div>loading...</div>;
  } else if (status == 'ERROR') {
    return <div>error...</div>;
  }
  throw new Error('Unhandled status');
};

export default Dictionary;
