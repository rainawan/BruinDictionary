import { useSearchParams } from 'react-router-dom';
import { fetchEntries, fetchTerms, fetchUsers } from '../../utils/fetchData';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { unpackEntriesQuery, unpackTermsQuery } from '../../utils/unpackQuery';
import { getTermsEntriesStatus } from '../../utils/getTermsEntriesStatus';
import getEntriesQuery from '../../utils/getEntriesQuery';
import getTermsQuery from '../../utils/getTermsQuery';
import CardLoading from './components/CardLoading';

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const searchEntries = Object.fromEntries(searchParams.entries());
  const { term, ...search } = searchEntries;
  const searchTerm = term?.toLowerCase();

  const termsQuery = getTermsQuery(searchTerm);
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);
  const termid = searchTerm && terms ? Object.keys(terms)[0] : undefined;

  const entriesQuery = getEntriesQuery({ termid, ...search });
  const { status: entriesStatus, data: entries } = unpackEntriesQuery(entriesQuery);
  console.log('entries: ', entries, '\nterms: ', terms);

  const status = getTermsEntriesStatus(termsStatus, entriesStatus);

  const Text = ({ h1, h2, h3, className, children }) => {
    const h1classname = h1 ? 'text-4xl font-extrabold text-yellow-200 text-left mb-3' : '';
    const h2classname = h2 ? 'text-2xl font-bold text-left' : '';
    const h3classname = h3 ? 'text-xl text-left ml-5' : '';
    return (
      <p className={`${h1classname} ${h2classname} ${h3classname} ${className}`}>{children}</p>
    );
  };

  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [isDislikeHovered, setIsDislikeHovered] = useState(false);

  if (status === 'loading') {
    return <CardLoading />;
  } else if (status === 'error') {
    return <div>error occurred</div>;
  } else if ((searchTerm && !termid) || entries?.length === 0) {
    return <div>not found</div>;
  } else if (status === 'success') {
    return (
      <div className="Terms">
        <div className="px-8 py-8">
          {entries.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-900 p-5 border-4 border-gray-200">
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
                <div className="buttons">
                  <div
                    className="icon-container"
                    onMouseEnter={() => setIsLikeHovered(true)}
                    onMouseLeave={() => setIsLikeHovered(false)}>
                    <BiLike size="50" color="white" />
                    {isLikeHovered && <BiSolidLike size="50" className="icon-hovered" />}
                  </div>
                  <div
                    className="icon-container"
                    onMouseEnter={() => setIsDislikeHovered(true)}
                    onMouseLeave={() => setIsDislikeHovered(false)}>
                    <BiDislike size="50" color="white" />
                    {isDislikeHovered && <BiSolidDislike size="50" className="icon-hovered" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    throw new Error('Unhandled status');
  }
};

export default Dictionary;
