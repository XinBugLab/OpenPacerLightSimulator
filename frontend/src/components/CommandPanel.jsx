import React, { useState } from 'react';

const CommandPanel = ({ onSendCommand }) => {
    const [command, setCommand] = useState('0x01,100,1000,2000,1000');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendCommand(command);
    };

    return (
        <div>
            <h2>Command Panel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Command:
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default CommandPanel;