import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'; // Make sure to include the CSS file for styling

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
        <div className="app-container">
            <header className="app-header">
                <h1>NBA Shot Chart Comparison</h1>
            </header>
            <div className="team-selectors">
                <select className="team-selector" value={team1} onChange={(e) => setTeam1(e.target.value)}>
                    <option value="">Select Team 1</option>
                    {teamsList.map((team) => (
                        <option key={team.teamId} value={team.teamId}>
                            {team.fullName}
                        </option>
                    ))}
                </select>
                <select className="team-selector" value={team2} onChange={(e) => setTeam2(e.target.value)}>
                    <option value="">Select Team 2</option>
                    {teamsList.map((team) => (
                        <option key={team.teamId} value={team.teamId}>
                            {team.fullName}
                        </option>
                    ))}
                </select>
            </div>
            {/* Placeholder for shot chart visualization */}
            <div className="shot-chart-container">
                {/* Visualization components would go here */}
            </div>
        </div>
    );
}

export default App;
