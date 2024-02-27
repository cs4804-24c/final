import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./ParallelPlotPage.css"
import StatTable from "../PlayerPage/Components/StatTable";

export default function ParallelPlotPage() {
    const svgRef = useRef(null);
    const [selectedSeason, setSelectedSeason] = useState('2023-24');
    const [data, setData] = useState([]);
    const [careerData, setCareerData] = useState(false);


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
                d.PPG = +d.PTS / +d.GP; // Calculated PPG
            });

            filteredData.sort((a, b) => b.PPG - a.PPG);

            const top100Players = filteredData.slice(0, 100);

            // Choose columns to use
            const dimensions = ['FG_PCT', 'FG3_PCT', 'FT_PCT', 'REB', 'AST', 'STL', 'BLK', 'PPG'];

            const colorScale = d3.scaleOrdinal(d3.schemeCategory10); //TODO: Do a custom color scale for a team's main colors

            // Build a linear scale For each dimension
            const y = {};
            dimensions.forEach(d => {
                y[d] = d3.scaleLinear()
                .domain(d3.extent(top100Players, p => +p[d]))
                .range([height, 0]);
            });

            //console.log(y)

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
                    .transition().duration(200)
                    .style("opacity", 0.2);

                // Select lines with the specific teamAbbreviation class and highlight them
                d3.selectAll("." + teamAbbreviation)
                    .transition().duration(200)
                    .style("stroke", colorScale(teamAbbreviation))
                    .style("stroke-width", 2)
                    .style("opacity", 1);

                // Further emphasize the specific player selected
                d3.select(this)
                    .transition().duration(200)
                    .style("stroke-width", 4)
                    .style("opacity", 1);
            };
            

            // Unhighlight
            const unhighlightTeam = function(event, d) {
                setCareerData(null); // Clear hovered data
                
                d3.selectAll(".line")
                    .transition().duration(200).delay(1000)
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
                .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(d => d)
                .style("fill", "black");
            /*
            // Tooltip + mouse events TODO: Add next to cursor
            const tooltip = d3.select("#parallel-plot-container").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);*/

        };
            
        // Cleanup
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        };
  }, [data, selectedSeason]);

    return (
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
                {careerData && <StatTable tableTitle="Selected Player" playerData={careerData}/>}
            </div>
        </div>
    );
}
