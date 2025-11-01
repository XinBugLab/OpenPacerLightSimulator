import React, { useState } from 'react';

const LightConfig = ({ onConfigChange }) => {
    const [numLights, setNumLights] = useState(8);

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfigChange(numLights);
    };

    return (
        <div>
            <h2>Light Configuration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Number of Lights:
                    <input
                        type="number"
                        value={numLights}
                        onChange={(e) => setNumLights(parseInt(e.target.value, 10))}
                        min="1"
                        max="32"
                    />
                </label>
                <button type="submit">Set</button>
            </form>
        </div>
    );
};

export default LightConfig;