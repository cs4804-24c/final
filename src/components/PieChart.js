import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../tooltip.css';

const PieChart = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const width = 450;
            const height = 450;
            const margin = 40;

            const radius = Math.min(width, height) / 2 - margin;
            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const pie = d3.pie()
                .value(d => d.value);

            const data_ready = pie(data);

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            const tooltip = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            // Animation setup
            svg.selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => d3.schemeCategory10[i % d3.schemeCategory10.length])
                .attr('stroke', 'white')
                .style('stroke-width', '2px')
                .style('opacity', 0.7)
                .on('mouseover', (event, d) => {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    tooltip.html(`Name: ${d.data.teamName}<br>Value: ${d.data.value}`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                })
                .on('mouseout', () => {
                    tooltip.transition()
                        .duration(500)
                        .style('opacity', 0);
                })
                .transition()
                .duration(1000)
                .attrTween('d', function(d) {
                    const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d);
                    };
                });

            // Add labels
            svg.selectAll('text')
                .data(data_ready)
                .enter()
                .append('text')
                .text(d => d.data.teamName)
                .attr("transform", function(d) {
                    const _d = arc.centroid(d);
                    return `translate(${_d[0]},${_d[1]})`;
                })
                .style("text-anchor", "middle")
                .style("font-size", 14);
        }
    }, [data]);

    return (
        <div>
            <h2>Win Distribution Pie Chart</h2>
            <div ref={d3Container} />
        </div>
    );
};

export default PieChart;
