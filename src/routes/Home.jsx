import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import { fetchTerms, fetchEntries, fetchUsers } from '../utils/fetchData';

const items = [
  {
    termid: 'ucla-termid',
    term: 'UCLA',
    description: 'University of California, Los Angeles'
  },
  {
    termid: 'yrl-termid',
    term: 'YRL',
    description: 'Young Research Library'
  }
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('term');
  console.log(location);
  console.log(searchTerm);

  const entries = fetchEntries();
  const terms = fetchTerms();
  const users = fetchUsers();

  const handleSelection = (term) => {
    if (term) {
      navigate(`/?term=${term}`);
    } else {
      navigate('/');
    }
  };

  return (
    <section className="flex-col space-y-2">
      <Searchbar items={items} handleSelection={handleSelection} />
      <div>
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
    </section>
  );
};

export default Home;
