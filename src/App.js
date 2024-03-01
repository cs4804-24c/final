import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import * as d3 from 'd3';
import ScatterPlot from "./components/ScatterPlot";
import BarChart from "./components/BarChart";
import './App.css'; 

const statCategories = ['W', 'L', 'W_PCT', 'PTS', 'REB', 'AST'];

function App() {
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [selectedStat, setSelectedStat] = useState(statCategories[0]);
    const [teamsList, setTeamsList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv("/2022_team_stats.csv").then((d) => {
          const teams = d.map(row => ({
            ...row,
            teamId: row.TEAM_ID,
            fullName: row.TEAM_NAME,
            FG_PCT: parseFloat(row.FG_PCT),
            W_PCT: parseFloat(row.W_PCT)
          }));
          setTeamsList(teams);
          setData(teams);
        });
      }, []);
      

  const renderVisualization = () => {
    const selectedTeams = teamsList.filter(team => 
        team.teamId === team1 || team.teamId === team2
    );

    return selectedTeams.map(team => (
        <div key={team.teamId}>
            {team.fullName}: {team[selectedStat]}
        </div>
    ));
    };

    const barChartData = teamsList
        .filter(team => team.teamId === team1 || team.teamId === team2)
        .map(team => ({
            name: team.fullName,
            value: +team[selectedStat],
        }));
const selectedTeamsData = teamsList
        .filter(team => team.TEAM_ID === team1 || team.TEAM_ID === team2)
        .map(team => ({
          value: team.W,
          teamName: team.TEAM_NAME
        }));
    return (
        <div className="app-container">
        <header className="app-header">
            <h1>2022-23 Season NBA Team Stats Comparison</h1>
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
                <div className="stat-selectors">
                    <select className="stat-selector" value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
                        {statCategories.map((stat, index) => (
                            <option key={index} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="visualization-container">
                {team1 || team2 ? renderVisualization() : "Select teams to see the stats"}
            </div>
            <BarChart data={barChartData} width={600} height={400} />
            <ScatterPlot  data={data.filter(team => team.teamId === team1 || team.teamId === team2)} />
            <PieChart data={selectedTeamsData} />
        </div>
    );
}

export default App;
