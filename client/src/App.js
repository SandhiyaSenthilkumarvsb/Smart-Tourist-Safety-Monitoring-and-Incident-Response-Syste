// 1. We import the "pieces" we created in other files
import React from 'react';
import SOSButton from './SOSButton'; // Imports your button
import MapView from './MapContainer'; // Imports your map


function App() {
  return (
    <div className="App">
      {/* This is your Website Header */}
      <header className="App-header" style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h1>Smart Tourist Safety System</h1>
      </header>

      {/* This is the Main Body where your tools live */}
      <main style={{ padding: '20px' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Emergency Controls</h3>
          <SOSButton /> {/* This puts the SOS Button on the screen */}
        </div>

        <div style={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <h3>Safety Map</h3>
          <MapView /> {/* This puts the Leaflet Map on the screen */}
        </div>

      </main>
    </div>
  );
}

export default App;