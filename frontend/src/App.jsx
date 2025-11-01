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
      <ControlPanel
        onConfigChange={handleConfigChange}
        onSendCommand={handleSendCommand}
      />
      <SimulationView numLights={numLights} lightStates={lightStates} />
    </Layout>
  );
}

export default App;
