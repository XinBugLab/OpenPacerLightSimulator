import React, { useState } from 'react';
import './LightConfig.css';

const LightConfig = ({ onConfigChange }) => {
  const [numLights, setNumLights] = useState(8);

  const handleSet = () => {
    onConfigChange(numLights);
  };

  return (
    <div className="light-config">
      <h2>Light Configuration</h2>
      <label>
        Number of Lights:
        <input
          type="number"
          value={numLights}
          onChange={(e) => setNumLights(parseInt(e.target.value, 10))}
        />
      </label>
      <button onClick={handleSet}>Set</button>
    </div>
  );
};

export default LightConfig;