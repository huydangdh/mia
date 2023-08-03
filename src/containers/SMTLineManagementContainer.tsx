// src/components/SMTManagementContainer.tsx

import React from 'react';
import LineTW1 from '../components/smtmanagement/SMTLineManagement';

const SMTManagementContainer: React.FC = () => {
  return (
    <div className="smt-management-container">
      <h1>SMT Management Container</h1>
      <LineTW1 />
      {/* You can add other components or features related to SMT management here */}
    </div>
  );
};

export default SMTManagementContainer;

