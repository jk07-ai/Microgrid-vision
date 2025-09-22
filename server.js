// Simple Express server to receive and process microgrid data

const express = require('express');
const app = express();
const PORT = 5000;

let microgridData = []; // { timestamp, source: "windmill"|"solarcell", value, efficiency }

app.use(express.json());

// Endpoint to receive data from microgrids
app.post('/api/data', (req, res) => {
    const { source, value, efficiency } = req.body;
    microgridData.push({
        timestamp: Date.now(),
        source,
        value,
        efficiency,
    });
    res.json({ status: 'ok' });
});

// Endpoint to get recent data
app.get('/api/data', (req, res) => {
    // Return last 50 data points
    res.json(microgridData.slice(-50));
});

// Endpoint to check efficiency trend
app.get('/api/efficiency-trend', (req, res) => {
    const recent = microgridData.slice(-10);
    if (recent.length < 2) return res.json({ trend: 'insufficient data' });
    // Simple trend: compare last and previous average efficiency
    const firstHalf = recent.slice(0, recent.length / 2);
    const secondHalf = recent.slice(recent.length / 2);
    const avgFirst = firstHalf.reduce((acc, d) => acc + d.efficiency, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((acc, d) => acc + d.efficiency, 0) / secondHalf.length;
    let trend = 'stable';
    if (avgSecond > avgFirst) trend = 'improving';
    else if (avgSecond < avgFirst) trend = 'decreasing';
    res.json({ trend, avgFirst, avgSecond });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));