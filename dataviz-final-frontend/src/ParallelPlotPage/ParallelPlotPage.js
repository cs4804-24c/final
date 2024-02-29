import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./ParallelPlotPage.css"
import PlayerTable from "./Components/PlayerTable";
import Banner from "../Banner";

export default function ParallelPlotPage() {
    const svgRef = useRef(null);
    const [selectedSeason, setSelectedSeason] = useState('2023-24');
    const [data, setData] = useState([]);
    const [careerData, setCareerData] = useState(false);

    // Load player data from JSON file
    const [playerData, setPlayerData] = useState([]);
    useEffect(() => {
        fetch('players.json')
            .then(response => response.json())
            .then(data => setPlayerData(data))
            .catch(error => console.error('Error loading player data:', error));
    }, []);

    // Match CSV PLAYER_ID to JSON ID and return the actual name
    const getPlayerName = (playerId) => {
        console.log(playerId)
        const player = playerData.find(player => player.id === parseInt(playerId));
        return player ? player.full_name : 'Unknown';
    };

    // Parse data
    useEffect(() => {
        d3.csv("all_players_career_stats.csv").then(data => {
            setData(data);
        });
    }, []);

    useEffect(() => {
        const margin = { top: 50, right: 0, bottom: 50, left: 50 };
        const width = window.innerWidth - margin.left - margin.right;
        const height = window.innerHeight - margin.top - margin.bottom;

        // Check if SVG element already exists
        if (!svgRef.current) {
            const svg = d3.select('#parallel-plot-container')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            svgRef.current = svg.node();
        }

        if (data.length > 0) {
            const filteredData = data.filter(d => d.SEASON_ID === selectedSeason);

            filteredData.forEach(d => {
                d.PPG = +d.PTS / +d.GP; // Calculate Averages by [Stat] / [Games Played]
                d.REB_AVG = +d.REB / +d.GP;
                d.AST_AVG = +d.AST / +d.GP;
                d.STL_AVG = +d.STL / +d.GP;
                d.BLK_AVG = +d.BLK / +d.GP;
            });

            filteredData.sort((a, b) => b.PPG - a.PPG);

            const top100Players = filteredData.slice(0, 100);

            // Parallel Coordinate Columns
            const dimensions = ['FG_PCT', 'FG3_PCT', 'FT_PCT', 'REB_AVG', 'AST_AVG', 'STL_AVG', 'BLK_AVG', 'PPG'];

            const teamColors = {
                // https://teamcolorcodes.com/nba-team-color-codes/
                "ATL": "#E03A3E", // Hawks Red
                "BOS": "#007A33", // Celtics Green
                "BKN": "#000000", // Black - Same with UTA
                "CHA": "#00788C", // Teal
                "CHI": "#CE1141", // Bulls Red - Same with HOU & SAS
                "CLE": "#860038", // Cavaliers Wine
                "DAL": "#002B5E", // Navy Blue
                "DEN": "#1D428A", // Skyline blue
                "DET": "#C8102E", // Red
                "GSW": "#FFC72C", // Golden Yellow
                "HOU": "#CE1141", // Red - Same with CHI & SAS
                "IND": "#002D62", // Pacers Blue
                "LAC": "#1D428A", // Blue
                "LAL": "#FDB927", // Gold
                "MEM": "#5D76A9", // Blue
                "MIA": "#98002E", // Red
                "MIL": "#00471B", // Good Land Green
                "MIN": "#236192", // Lake Blue
                "NOP": "#0C2340", // Pelicans Navy
                "NYK": "#F58426", // Knicks Orange
                "OKC": "#007AC1", // Thunder Blue
                "ORL": "#0077C0", // Magic Blue
                "PHI": "#006BB6", // Blue
                "PHX": "#E56020", // Orange
                "POR": "#E03A3E", // Red
                "SAC": "#5A2D81", // Purple
                "SAS": "#C4CED4", // Silver
                "TOR": "#CE1141", // Red - Same with CHI & HOU
                "UTA": "#000000", // Black - Same with BKN
                "WAS": "#002B5C"  // Navy Blue
            };

            const colorScale = d3.scaleOrdinal()
                .domain(Object.keys(teamColors))
                .range(Object.values(teamColors));

            // Build a linear scale For each dimension
            const y = {};
            dimensions.forEach(d => {
                y[d] = d3.scaleLinear()
                .domain(d3.extent(top100Players, p => +p[d]))
                .range([height, 0]);
            });

            // Build the X scale
            const x = d3.scalePoint()
                .range([0, width])
                .padding(1)
                .domain(dimensions);

            // Path function
            const path = d => d3.line()(dimensions.map(p => [x(p), y[p](d[p])]));

            const highlightTeam = function(event, d) {
                const teamAbbreviation = d.TEAM_ABBREVIATION;

                setCareerData(d); // Set hovered data

                d3.selectAll(".line")
                    .transition().duration(100)
                    .style("opacity", 0.1);

                // Select lines with the specific teamAbbreviation class and highlight them
                d3.selectAll("." + teamAbbreviation)
                    .transition().duration(100)
                    .style("stroke", colorScale(teamAbbreviation))
                    .style("stroke-width", 2)
                    .style("opacity", 1);

                // Further emphasize the specific player selected
                d3.select(this)
                    .transition().duration(100)
                    .style("stroke-width", 4)
                    .style("opacity", 1);
            };

            // Un-highlight
            const unhighlightTeam = function(event, d) {
                setCareerData(null); // Clear hovered data
                
                d3.selectAll(".line")
                    .transition().duration(200).delay(500)
                    .style("stroke", line => colorScale(line.TEAM_ABBREVIATION))
                    .style("stroke-width", 1)
                    .style("opacity", 0.5);
            };

            // Draw lines
            d3.select(svgRef.current).selectAll("myPath")
                .data(top100Players)
                .enter().append("path")
                    .attr("class", d => "line " + d.TEAM_ABBREVIATION) // Identifier couldn't start with a digit which is why TEAM_ID failed bruh
                    .attr("d", path)
                    .style("fill", "none")
                    .style("stroke", d => colorScale(d.TEAM_ABBREVIATION)) // Color code by TEAM_ID
                    .style("stroke-width", 1)
                    .style("opacity", 0.5)
                    .on("mouseover", highlightTeam)
                    .on("mouseleave", unhighlightTeam);

            // Draw axis
            d3.select(svgRef.current).selectAll(".axis")
                .data(dimensions)
                .enter().append("g")
                .attr("class", "axis")
                .attr("transform", d => `translate(${x(d)},0)`)
                .each(function(d) { 
                    // Add a transparent hitbox over the axis to increase the clickable area
                    d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); 
                    d3.select(this).append("rect")
                        .attr("class", "overlay")
                        .attr("x", -10)
                        .attr("y", -margin.top)
                        .attr("width", 50)
                        .attr("height", height + margin.top + margin.bottom)
                        .style("fill", "transparent")
                        .on("click", (event) => handleAxisClick(event, d));
                })
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(d => d)
                .style("fill", "black");
            
            // Keep track of selected ranges on each axis
            let clickedPointsMap = {};
            // Keep track of filtered data on each axis
            let filteredDataMap = {}; 
            
            // Function for handling clicks on axes
            const handleAxisClick = (event, dimension) => {
                const clickedValue = y[dimension].invert(event.layerY - margin.top - 96);
                //console.log(clickedValue) //TODO: Debugging
            
                // Initialize the list for selected axis if it doesn't exist
                if (!clickedPointsMap[dimension]) {
                    clickedPointsMap[dimension] = [];
                }

                //console.log(clickedPointsMap) //TODO: Debugging
            
                clickedPointsMap[dimension].push(clickedValue);
            
                // Apply a filter if there are enough points to create a range
                if (clickedPointsMap[dimension].length === 2) {
                    filterDataOnAxis(dimension);
                }
            };

            const filterDataOnAxis = (dimension) => {
                const [point1, point2] = clickedPointsMap[dimension].sort((a, b) => a - b);
                const minValue = point1;
                const maxValue = point2;

                // Filter Top100Players to be in the axis range
                const filteredData = top100Players.filter(d => {
                    const value = +d[dimension];
                    return value >= minValue && value <= maxValue;
                });

                //console.log(filteredData) //TODO: Debugging

                // Update the filtered data for current axis
                filteredDataMap[dimension] = filteredData;
                
                // Draw the resulting lines
                drawFilteredLines();
            };

            const drawFilteredLines = () => {
                // Combine filters to get the final filtered data
                let finalFilteredData = top100Players;

                Object.keys(filteredDataMap).forEach(dimension => {
                    finalFilteredData = finalFilteredData.filter(d => filteredDataMap[dimension].includes(d));
                });

                // Remove existing lines
                d3.select(svgRef.current).selectAll(".line").remove();

                // Draw filtered lines
                d3.select(svgRef.current).selectAll("myPath")
                    .data(finalFilteredData)
                    .enter().append("path")
                        .attr("class", d => "line " + d.TEAM_ABBREVIATION)
                        .attr("d", path)
                        .style("fill", "none")
                        .style("stroke", d => colorScale(d.TEAM_ABBREVIATION))
                        .style("stroke-width", 1)
                        .style("opacity", 0.5)
                        .on("mouseover", highlightTeam)
                        .on("mouseleave", unhighlightTeam);
            };   

            // Middle click for resetting all axis filters
            const handleMouseDown = (event) => {
                if (event.button === 1) {
                    clickedPointsMap = {};
                    redrawAllLines();
                }
            };

            document.addEventListener("mousedown", handleMouseDown);

            const redrawAllLines = () => {
                d3.select(svgRef.current).selectAll(".line").remove();

                d3.select(svgRef.current).selectAll("myPath")
                    .data(top100Players)
                    .enter().append("path")
                        .attr("class", d => "line " + d.TEAM_ABBREVIATION)
                        .attr("d", path)
                        .style("fill", "none")
                        .style("stroke", d => colorScale(d.TEAM_ABBREVIATION))
                        .style("stroke-width", 1)
                        .style("opacity", 0.5)
                        .on("mouseover", highlightTeam)
                        .on("mouseleave", unhighlightTeam);
            }; 
        };
            
        // Cleanup
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        };
  }, [data, selectedSeason]);

    return (
        <div>
            <Banner/>
            <div className="container">
                <div className="dropdown-container">
                    <select
                        value={selectedSeason}
                        onChange={e => setSelectedSeason(e.target.value)}
                    >
                        {data.length > 0 && (
                            [...new Set(data.map(d => d.SEASON_ID))]
                                .sort((a, b) => b.localeCompare(a)) // Descending order
                                .map(season => (
                                    <option key={season} value={season}>{season}</option>
                                ))
                        )}
                    </select>
                </div>
                <div id="parallel-plot-container" className="parallel-plot-container"></div>
                <div id="hold-table" className="hold-table-container">
                    {careerData && <PlayerTable tableTitle={getPlayerName(careerData.PLAYER_ID)} playerData={careerData}/>}
                </div>
            </div>
        </div>
    );
}
