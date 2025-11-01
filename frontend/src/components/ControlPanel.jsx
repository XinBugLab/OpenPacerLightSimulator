import React from 'react';
import LightConfig from './LightConfig';
import CommandPanel from './CommandPanel';
import './ControlPanel.css';

const ControlPanel = ({ onConfigChange, onSendCommand }) => {
  return (
    <div className="control-panel">
      <LightConfig onConfigChange={onConfigChange} />
      <CommandPanel onSendCommand={onSendCommand} />
    </div>
  );
};

export default ControlPanel;