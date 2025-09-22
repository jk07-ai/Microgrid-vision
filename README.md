# Microgrid Efficiency Monitor

This project provides a simple website and backend for collecting real-time data from microgrids (windmill, solar cells) and checking for improving or decreasing efficiency.

## How it works

- Devices (or simulators) POST data to `/api/data` (source, value, efficiency).
- The dashboard displays incoming data and shows if efficiency is improving, decreasing, or stable.

## Getting started

1. **Backend:**  
   - Install dependencies: `npm install`
   - Start server: `node server.js`

2. **Frontend:**  
   - Place the `src/App.jsx` in a React app.
   - Run with `npm start`.

## Endpoints

- `POST /api/data` — Submit microgrid data (JSON: source, value, efficiency)
- `GET /api/data` — Get recent data points
- `GET /api/efficiency-trend` — See if efficiency is improving or decreasing

## Note

- In real deployment, connect actual microgrid sensors or IoT platforms to POST data.
- Expand backend for authentication, multi-user support, and robust analytics as needed.