const express = require('express');
const cors = require('cors');
const fs = require('fs'); // This allows us to write to files
const app = express();

app.use(cors());
app.use(express.json());

// This handles the SOS signal from your browser
app.post('/api/sos', (req, res) => {
    const { lat, lng, time } = req.body;
    
    // Create the message we want to save
    const logMessage = `🚨 EMERGENCY: Lat: ${lat}, Lng: ${lng}, Time: ${time}\n`;

    // 1. Show it in the VS Code Terminal
    console.log(logMessage);

    // 2. Save it to a file named 'alerts.txt'
    // 'a' means "append" - it adds to the end of the file instead of deleting old ones
    fs.appendFile('alerts.txt', logMessage, (err) => {
        if (err) {
            console.error("Error saving to file:", err);
        } else {
            console.log("✅ Alert saved to alerts.txt");
        }
    });

    res.status(200).send({ message: "Help is on the way!" });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});