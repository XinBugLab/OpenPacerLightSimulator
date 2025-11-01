import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Layout from './components/Layout';
import ControlPanel from './components/ControlPanel';
import SimulationView from './components/SimulationView';

const socket = io('http://localhost:5000');

function App() {
  const [lightStates, setLightStates] = useState([]);
  const [numLights, setNumLights] = useState(8);

  useEffect(() => {
    socket.on('update', (newLightStates) => {
      setLightStates(newLightStates);
    });

    return () => {
      socket.off('update');
    };
  }, []);

  const handleConfigChange = (newNumLights) => {
    setNumLights(newNumLights);
    socket.emit('config', { num_lights: newNumLights });
  };

  const handleSendCommand = (command) => {
    socket.emit('command', { command });
  };

  return (
    <Layout>
      <header className="app-header">
        <h1>Pacer Light Simulation</h1>
      </header>
      <div className="main-content">
        <div className="control-panel-container">
          <ControlPanel
            onConfigChange={handleConfigChange}
            onSendCommand={handleSendCommand}
          />
        </div>
        <div className="simulation-view-container">
          <SimulationView numLights={numLights} lightStates={lightStates} />
        </div>
      </div>
      <footer className="app-footer">
        <p>&copy; 2025 新Bug实验室. All rights reserved.</p>
      </footer>
    </Layout>
  );
}

export default App;
