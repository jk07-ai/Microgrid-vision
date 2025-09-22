import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [trend, setTrend] = useState("");

  useEffect(() => {
    // Fetch recent data
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);

    // Fetch efficiency trend
    fetch("/api/efficiency-trend")
      .then((res) => res.json())
      .then((res) => setTrend(res.trend));
  }, []);

  return (
    <div style={{padding: "2rem"}}>
      <h1>Microgrid Efficiency Monitor</h1>
      <h2>Efficiency Trend: <span style={{color: trend === "decreasing" ? "red" : trend === "improving" ? "green" : "gray"}}>{trend}</span></h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Source</th>
            <th>Value</th>
            <th>Efficiency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{new Date(d.timestamp).toLocaleString()}</td>
              <td>{d.source}</td>
              <td>{d.value}</td>
              <td>{d.efficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;