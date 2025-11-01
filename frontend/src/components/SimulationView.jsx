import React, { useState, useEffect, useRef } from 'react';

const SimulationView = ({ numLights, lightStates }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const lights = [];
  const straightLength = 84.39;
  const curveRadius = 36.5;

  const originalWidth = straightLength + 2 * curveRadius;
  const originalHeight = 2 * curveRadius;

  const scale = Math.min(
    containerSize.width / originalWidth,
    containerSize.height / originalHeight
  );

  const scaledStraightLength = straightLength * scale;
  const scaledCurveRadius = curveRadius * scale;

  const offsetX = (containerSize.width - (scaledStraightLength + 2 * scaledCurveRadius)) / 2;
  const offsetY = (containerSize.height - 2 * scaledCurveRadius) / 2;

  const trackLaneWidth = 10; // As an original dimension, not pixels
  const scaledTrackLaneWidth = trackLaneWidth * scale;
  const trackCenterOffset = scaledTrackLaneWidth / 2;

  const centerStraightLength = scaledStraightLength;
  const centerCurveRadius = scaledCurveRadius - trackCenterOffset;
  const centerCurveLength = Math.PI * centerCurveRadius;
  const centerTotalLength = 2 * centerStraightLength + 2 * centerCurveLength;

  const lightSize = Math.max(4, 6 * scale); // Use scaled size, with a minimum

  for (let i = 0; i < numLights; i++) {
    const pos = (i / numLights) * centerTotalLength;
    let x, y;

    // Top straight
    if (pos < centerStraightLength) {
      x = scaledCurveRadius + pos;
      y = trackCenterOffset;
    }
    // Right curve
    else if (pos < centerStraightLength + centerCurveLength) {
      const angle = (pos - centerStraightLength) / centerCurveRadius - Math.PI / 2;
      x = scaledCurveRadius + centerStraightLength + Math.cos(angle) * centerCurveRadius;
      y = scaledCurveRadius + Math.sin(angle) * centerCurveRadius;
    }
    // Bottom straight
    else if (pos < 2 * centerStraightLength + centerCurveLength) {
      x = scaledCurveRadius + centerStraightLength - (pos - (centerStraightLength + centerCurveLength));
      y = 2 * scaledCurveRadius - trackCenterOffset;
    }
    // Left curve
    else {
      const angle = (pos - (2 * centerStraightLength + centerCurveLength)) / centerCurveRadius + Math.PI / 2;
      x = scaledCurveRadius + Math.cos(angle) * centerCurveRadius;
      y = scaledCurveRadius + Math.sin(angle) * centerCurveRadius;
    }

    const lightState = lightStates[i] || { state: 'off' };

    lights.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x + offsetX}px`,
          top: `${y + offsetY}px`,
          transform: 'translate(-50%, -50%)',
          width: `${lightSize}px`,
          height: `${lightSize}px`,
          backgroundColor: lightState.state === 'on' ? '#ffeb3b' : '#444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${lightSize / 2}px`,
          fontWeight: 'bold',
          color: lightState.state === 'on' ? '#000' : '#ccc',
          zIndex: 2,
        }}
      >
        <span>{i + 1}</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* The track */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${scaledStraightLength + 2 * scaledCurveRadius}px`,
          height: `${2 * scaledCurveRadius}px`,
          backgroundColor: '#a0522d',
          borderRadius: scaledCurveRadius,
          zIndex: 0,
        }}
      />
      {/* The inner field */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: scaledStraightLength,
          height: 2 * scaledCurveRadius - 2 * scaledTrackLaneWidth,
          backgroundColor: '#333',
          zIndex: 1,
        }}
      />
      {lights}
    </div>
  );
};

export default SimulationView;