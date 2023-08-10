import React, { useState, useEffect } from 'react';
import FeedersList from './FeedersList';
import './SMTLine.css'

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
    // ... (other feeder data)
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
      <div className="current-production">
        <div className="pcb-name">
          <span>PCB Name:</span>
          <span className="animated-text">{currentProduction.pcbName}</span>
        </div>
        <div className="feeder-barcode">
          <span>Feeder Barcode:</span>
          <span>{currentProduction.feederBarcode}</span>
        </div>
      </div>
      <FeedersList feeders={feedersData} />
    </div>
  );
};

export default SMTMachine1;
