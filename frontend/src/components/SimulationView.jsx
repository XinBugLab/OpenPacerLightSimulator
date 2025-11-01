import React from 'react';

const SimulationView = ({ numLights, lightStates }) => {
  const lights = [];
  const straightLength = 84.39;
  const curveRadius = 36.5;
  const scale = 4;

  const scaledStraightLength = straightLength * scale;
  const scaledCurveRadius = curveRadius * scale;
  const scaledCurveLength = Math.PI * scaledCurveRadius;
  const scaledTotalLength = 2 * scaledStraightLength + 2 * scaledCurveLength;

  const containerWidth = scaledStraightLength + 2 * scaledCurveRadius;
  const containerHeight = 2 * scaledCurveRadius;

  for (let i = 0; i < numLights; i++) {
    const pos = (i / numLights) * scaledTotalLength;
    let x, y;

    // Top straight
    if (pos < scaledStraightLength) {
      x = scaledCurveRadius + pos;
      y = 0;
    }
    // Right curve
    else if (pos < scaledStraightLength + scaledCurveLength) {
      const angle = (pos - scaledStraightLength) / scaledCurveRadius - Math.PI / 2;
      x = scaledCurveRadius + scaledStraightLength + Math.cos(angle) * scaledCurveRadius;
      y = scaledCurveRadius + Math.sin(angle) * scaledCurveRadius;
    }
    // Bottom straight
    else if (pos < 2 * scaledStraightLength + scaledCurveLength) {
      x = scaledCurveRadius + scaledStraightLength - (pos - (scaledStraightLength + scaledCurveLength));
      y = 2 * scaledCurveRadius;
    }
    // Left curve
    else {
      const angle = (pos - (2 * scaledStraightLength + scaledCurveLength)) / scaledCurveRadius + Math.PI / 2;
      x = scaledCurveRadius + Math.cos(angle) * scaledCurveRadius;
      y = scaledCurveRadius + Math.sin(angle) * scaledCurveRadius;
    }

    const lightState = lightStates[i] || { brightness: 0 };
    const lightStyle = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: `rgba(255, 255, 0, ${lightState.brightness / 255})`,
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#333',
    };

    lights.push(
      <div key={i} style={lightStyle}>
        <span>{i + 1}</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: containerWidth, height: containerHeight, margin: '20px auto' }}>
      {lights}
    </div>
  );
};

export default SimulationView;