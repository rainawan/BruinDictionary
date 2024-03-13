import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import UserPosts from './UserPosts';

const PostTabs = () => {
  return (
    <div className="flex flex-1 flex-col justify-start p-5">
      <Tabs aria-label="options">
        <Tab key="created" title="Created Posts">
          <div className="space-y-4">
            <UserPosts />
          </div>
        </Tab>
        <Tab key="liked" title="Liked Posts">
          <div className="space-y-4">
            <Card>
              <CardBody>liked</CardBody>
            </Card>
            <Card>
              <CardBody>liked</CardBody>
            </Card>
            <Card>
              <CardBody>liked</CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PostTabs;
