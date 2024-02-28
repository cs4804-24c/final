import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ShotChart = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      const margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      svg.selectAll("*").remove();

      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
       .append("g")
         .attr("transform",
               "translate(" + margin.left + "," + margin.top + ")");

      svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 5)
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .style("fill", d => d.made ? "green" : "red");
    }
  }, [data]);

  return (
    <svg className="d3-component" ref={d3Container} />
  );
}

export default ShotChart;
