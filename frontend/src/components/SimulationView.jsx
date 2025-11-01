import React, { useRef, useEffect, useState } from 'react';

const SimulationView = ({ numLights, lightStates }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        // Account for padding (1rem = 16px typically)
        const paddingSize = 32; // 1rem * 2 (left + right or top + bottom)
        setContainerSize({
          width: containerRef.current.offsetWidth - paddingSize,
          height: containerRef.current.offsetHeight - paddingSize,
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

  const SAFETY_FACTOR = 0.92;
  
  // Ensure minimum scale to prevent invisible track
  const minScale = 0.3; // Minimum scale factor
  const calculatedScale = containerSize.width > 0 && containerSize.height > 0 
    ? SAFETY_FACTOR * Math.min(
        containerSize.width / originalWidth,
        containerSize.height / originalHeight
      )
    : 1; // Default scale when container size is not available
  
  const scale = Math.max(minScale, calculatedScale);

  const scaledStraightLength = straightLength * scale;
  const scaledCurveRadius = curveRadius * scale;

  // Add padding offset since lights are positioned relative to the full container
  const paddingOffset = 16; // 1rem padding
  const offsetX = (containerSize.width - (scaledStraightLength + 2 * scaledCurveRadius)) / 2 + paddingOffset;
  const offsetY = (containerSize.height - 2 * scaledCurveRadius) / 2 + paddingOffset;

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
          backgroundColor: lightState.brightness > 0 ? '#ffeb3b' : '#444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${lightSize / 2}px`,
          fontWeight: 'bold',
          color: lightState.brightness > 0 ? '#000' : '#ccc',
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
        minWidth: '300px', /* 减小最小宽度以适应更小的屏幕 */
        minHeight: '300px', /* Ensure minimum height for track visibility */
        backgroundColor: '#f8f9fa', /* Light background to see the track */
        borderRadius: 0,
        /* Remove overflow: auto to allow page-level scrolling */
        padding: '1rem',
        boxSizing: 'border-box', /* 确保padding包含在总宽度内 */
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