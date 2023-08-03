// src/components/FeedersList.tsx

import React from 'react';

interface Feeder {
  id: number;
  name: string;
  componentType: string;
  status: string;
  materialCode: string;
}

interface FeedersListProps {
  feeders: Feeder[];
}

const FeedersList: React.FC<FeedersListProps> = ({ feeders }) => {
  return (
    <div className="feeders-list">
      <h3>Feeders List</h3>
      <ul>
        {feeders.map((feeder) => (
          <li key={feeder.id}>
            {feeder.name} - {feeder.componentType} - {feeder.status}
            {feeder.materialCode && <span> - Material Code: {feeder.materialCode}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedersList;

