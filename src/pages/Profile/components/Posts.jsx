import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import LoadingCard from '../../Dictionary/components/LoadingCard';

export default function App() {
  return (
    <div className="flex w-full flex-col col-span-10 sm:col-span-5 lg:col-span-7  p-5 rounded text-center">
      <Tabs aria-label="Options">
        <Tab key="posts" title="Created Posts">
          <div className="space-y-4">
            <Card>
              <CardBody>post</CardBody>
            </Card>
            <Card>
              <CardBody>post</CardBody>
            </Card>
            <Card>
              <CardBody>post</CardBody>
            </Card>
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
}
