import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import LightConfig from './components/LightConfig';
import CommandPanel from './components/CommandPanel';
import SimulationView from './components/SimulationView';

const socket = io('http://localhost:5000');

function App() {
    const [numLights, setNumLights] = useState(8);
    const [lightStates, setLightStates] = useState([]);

    useEffect(() => {
        socket.on('light_update', (newLightStates) => {
            setLightStates(newLightStates);
        });

        return () => {
            socket.off('light_update');
        };
    }, []);

    const handleConfigChange = (newNumLights) => {
        setNumLights(newNumLights);
    };

    const handleSendCommand = (command) => {
        socket.emit('command', command);
    };

    return (
        <div className="App">
            <h1>Pacer Light Simulator</h1>
            <LightConfig onConfigChange={handleConfigChange} />
            <CommandPanel onSendCommand={handleSendCommand} />
            <SimulationView numLights={numLights} lightStates={lightStates} />
        </div>
    );
}

export default App;
