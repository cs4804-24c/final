import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import BarChart from "./components/BarChart";
import './App.css'; 


const statCategories = ['W', 'L', 'W_PCT', 'PTS', 'REB', 'AST'];
function App() {
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [selectedStat, setSelectedStat] = useState(statCategories[0]);
    const [teamsList, setTeamsList] = useState([]);

    useEffect(() => {
      const loadTeamsList = () => {
          fetch('/team_stats.csv')
              .then(response => response.text())
              .then(csvText => {
                  Papa.parse(csvText, {
                      header: true,
                      complete: (results) => {
                          const teams = results.data.map(team => ({
                              teamId: team.TEAM_ID,
                              fullName: team.TEAM_NAME,
                              ...team
                          }));
                          setTeamsList(teams);
                      },
                  });
              })
              .catch(error => console.error("Failed to load teams list:", error));
      };

      loadTeamsList();
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
            
        </div>
    );
}

export default App;
