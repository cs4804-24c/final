import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [shotChart1, setShotChart1] = useState([]);
  const [shotChart2, setShotChart2] = useState([]);
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    if (team1) fetchShotChart(team1, setShotChart1);
  }, [team1]);

  useEffect(() => {
    if (team2) fetchShotChart(team2, setShotChart2);
  }, [team2]);

  const fetchShotChart = async (teamId, setShotChartData) => {
    try {
      const response = await axios.get(`/shotchart/${teamId}`);
      setShotChartData(response.data);
    } catch (error) {
      console.error("Failed to fetch shot chart data:", error);
    }
  };

  return (
    <div>
      <h1>NBA Shot Chart Comparison</h1>
      <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
        <option value="">Select Team 1</option>
        {teamsList.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.fullName}
          </option>
        ))}
      </select>
      <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
        <option value="">Select Team 2</option>
        {teamsList.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.fullName}
          </option>
        ))}
      </select>
      {/* Visualization or rendering of shot chart data */}
    </div>
  );
}

export default App;
