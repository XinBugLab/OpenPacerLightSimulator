import React, { useState } from 'react';
import './CommandPanel.css';

const CommandPanel = ({ onSendCommand }) => {
  const [command, setCommand] = useState('0x01,100,1000,2000,1000');

  const handleSend = () => {
    onSendCommand(command);
  };

  return (
    <div className="command-panel">
      <h2>Command Panel</h2>
      <label>
        Command:
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default CommandPanel;