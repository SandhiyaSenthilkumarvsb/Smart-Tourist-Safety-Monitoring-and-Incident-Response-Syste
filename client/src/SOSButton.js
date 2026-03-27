import React, { useState } from 'react';
import axios from 'axios';

const SOSButton = () => {
    const [status, setStatus] = useState("");

    const handleSOS = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const data = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                time: new Date().toLocaleTimeString()
            };

            try {
                await axios.post('http://localhost:5000/api/sos', data);
                setStatus("Alert Sent! Help is coming.");
            } catch (err) {
                setStatus("Error: Server not reached");
            }
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button 
                onClick={handleSOS} 
                style={{ padding: '20px 40px', fontSize: '20px', backgroundColor: 'red', color: 'white', borderRadius: '10px', cursor: 'pointer' }}
            >
                SEND SOS
            </button>
            <p>{status}</p>
        </div>
    );
};

export default SOSButton;