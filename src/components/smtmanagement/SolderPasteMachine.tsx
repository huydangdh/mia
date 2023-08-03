// src/components/SolderPasteMachine.tsx

import React from 'react';

const SolderPasteMachine: React.FC = () => {
  const pasteLevel = 90; // Example paste level value (in percentage)
  
  return (
    <div className="solder-paste-machine">
      <h2>Solder Paste Machine</h2>
      <p>Paste Level: {pasteLevel}%</p>
    </div>
  );
};

export default SolderPasteMachine;

