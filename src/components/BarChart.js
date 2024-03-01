import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width = 600, height = 400 }) => {
    const ref = useRef();
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };

    useEffect(() => {
        if (data.length === 0) {
            return;
        }

        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll("*").remove();

        // Adjusted width and height after margins
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(data.map(d => d.name))
            .padding(0.4);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([chartHeight, 0]);

        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Bars
        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.name))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => chartHeight - yScale(d.value))
            .attr('fill', 'steelblue');

        // Labels
        chart.append('g')
            .call(d3.axisLeft(yScale).tickSize(-chartWidth))
            .call(g => g.select('.domain').remove())
            .attr('color', '#4f4f4f');

        chart.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(d3.axisBottom(xScale));

    }, [data, height, width, margin.bottom, margin.left, margin.right, margin.top]);

    return (
        <svg ref={ref}></svg>
    );
};

export default BarChart;
