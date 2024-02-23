import { useSearchParams } from 'react-router-dom';
import { fetchEntries, fetchTerms, fetchUsers } from '../../utils/fetchData';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term')?.toLowerCase();

  const entries = fetchEntries();
  const terms = fetchTerms();
  const users = fetchUsers();
  console.log('entries: ', entries, '\nterms: ', terms, '\nusers: ', users);

  const Text = ({ h1, h2, h3, className, children }) => {
    const h1classname = h1 ? 'text-4xl font-bold text-yellow-200 text-left mb-3' : '';
    const h2classname = h2 ? 'text-1.8xl font-bold text-left' : '';
    const h3classname = h3 ? 'text-1.5xl text-left ml-5' : '';
    return (
      <p className={`${h1classname} ${h2classname} ${h3classname} ${className}`}>{children}</p>
    );
  };

  const [isLikeHovered, setIsLikeHovered] = useState(false);

  return (
    <div className="Terms">
      <div className="px-8 py-8">
        <BiDislike size="60" />
        <BiSolidDislike size="60" />

        <div
          className="like-container"
          onMouseEnter={() => setIsLikeHovered(true)}
          onMouseLeave={() => setIsLikeHovered(false)}>
          <BiLike size="60" />
          {isLikeHovered && <BiSolidLike size="60" className="like-icon" />}
        </div>

        <Button color="primary">Button</Button>
        {entries && terms && users ? (
          entries.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-900 p-5 border">
                <Text h1 className="term">
                  {terms[entry.termid]}
                </Text>
                <Text h2>Definition</Text>
                <Text h3 className="definition">
                  {entry.definition}
                </Text>
                <Text h2>Example</Text>
                <Text h3 className="example">
                  {entry.example}
                </Text>
              </div>
            </div>
          ))
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
