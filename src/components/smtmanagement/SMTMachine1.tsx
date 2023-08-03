// src/components/SMTMachine/SMTMachine1.tsx

import React, { useState, useEffect } from 'react';
import FeedersList from './FeedersList';

interface CurrentProduction {
  pcbName: string;
  feederBarcode: string;
}

const SMTMachine1: React.FC = () => {
  const [currentProduction, setCurrentProduction] = useState<CurrentProduction>({
    pcbName: 'PCB1234',
    feederBarcode: 'FEEDER5678',
  });

  const [feedersData, setFeedersData] = useState([
    {
      id: 1,
      name: 'Feeder 1',
      componentType: 'Resistor',
      status: 'Ready',
      materialCode: 'RES001',
    },
    {
      id: 2,
      name: 'Feeder 2',
      componentType: 'Capacitor',
      status: 'Empty',
      materialCode: '',
    },
    {
      id: 3,
      name: 'Feeder 3',
      componentType: 'IC',
      status: 'Ready',
      materialCode: 'IC123',
    },
    {
      id: 4,
      name: 'Feeder 4',
      componentType: 'Connector',
      status: 'Low',
      materialCode: 'CONN789',
    },
    // Add more feeders data here...
  ]);

  useEffect(() => {
    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      // Generate random data for demonstration purposes
      const randomPCBName = `PCB${Math.floor(Math.random() * 10000)}`;
      const randomFeederBarcode = `FEEDER${Math.floor(Math.random() * 10000)}`;

      setCurrentProduction({
        pcbName: randomPCBName,
        feederBarcode: randomFeederBarcode,
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="smt-machine">
      <h2>SMT Machine 1</h2>
      <h3>Current Production</h3>
      <p>PCB Name: {currentProduction.pcbName}</p>
      <p>Feeder Barcode: {currentProduction.feederBarcode}</p>
      <FeedersList feeders={feedersData} />
    </div>
  );
};

export default SMTMachine1;
