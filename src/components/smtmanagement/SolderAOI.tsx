// src/components/SolderAOI.tsx

import React from 'react';

const SolderAOI: React.FC = () => {
  const defectsFound = 5; // Example defects found during inspection
  
  return (
    <div className="solder-aoi">
      <h2>Solder AOI (Automated Optical Inspection)</h2>
      <p>Defects Found: {defectsFound}</p>
    </div>
  );
};

export default SolderAOI;

