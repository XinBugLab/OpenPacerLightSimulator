import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  const controlPanel = React.Children.toArray(children).find(
    (child) => child.type.name === 'ControlPanel'
  );
  const simulationView = React.Children.toArray(children).find(
    (child) => child.type.name === 'SimulationView'
  );

  return (
    <div className="layout">
      <div className="control-panel-container">{controlPanel}</div>
      <div className="simulation-view-container">{simulationView}</div>
    </div>
  );
};

export default Layout;