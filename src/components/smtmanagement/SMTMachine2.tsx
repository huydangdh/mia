// src/components/SMTMachine/SMTMachine2.tsx

import React from 'react';
import FeedersList from './FeedersList';

const SMTMachine2: React.FC = () => {
  const feedersData = [
    {
      id: 1,
      name: 'Feeder 3',
      componentType: 'IC',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'Feeder 4',
      componentType: 'Connector',
      status: 'Low',
    },
    // Add more feeders data here...
  ];

  return (
    <div className="smt-machine">
      <h2>SMT Machine 2</h2>
      {/* Display machine details here... */}
      <FeedersList feeders={feedersData} />
    </div>
  );
};

export default SMTMachine2;

