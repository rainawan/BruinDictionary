import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import UserPosts from './UserPosts';
import DictionaryCard from '../../Dictionary/components/DictionaryCard';

const entry = {
  id: '0',
  termid: '0',
  userid: 'P7OymLPDqfbjpQsahvjMM8Hmlin2',
  definition: 'The number one public university.',
  example: 'I love being a student at UCLA!',
  likes: 37,
  dislikes: 0
};
const term = { 0: 'UCLA' };

const PostTabs = () => {
  return (
    <div className="flex flex-1 flex-col justify-start p-3 sm:p-5">
      <Tabs aria-label="options">
        <Tab key="created" title="Created Posts">
          <div className="space-y-4">
            <UserPosts />
          </div>
        </Tab>
        <Tab key="liked" title="Liked Posts">
          <div className="space-y-4">
            <DictionaryCard entry={entry} terms={term} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PostTabs;
