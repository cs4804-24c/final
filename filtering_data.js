{
//For fixed filter
const filteredData = flare.filter(d => d.region === "MENA");

//For dynamic filter attached to dropdown menu

/* HTML for dropdown menu creation, add before java script
<select id="violenceDropdown">
      <option value="All">All</option>
      <option value="1">Protester Violence</option>
      <option value="0">No Violence</option>
    </select>
*/
  
function updateChart(selectViolence) {
      const filteredData = selectViolence === 'All' ? flare : flare.filter(d => d.protesterviolence === selectViolence);

  // Remove previous instances of the chart
  svg.selectAll('g').remove();

  // Add all chart creation code here, except the code to create the SVG. That must be done before the updateChart function

  };

  // Initial Chart Render
  updateChart('All');

  // Event listener for dropdown change
  d3.select('#violenceDropdown')
    .on('change', function() {
     const selectViolence = this.value;
     updateChart(selectViolence);
  });

  // Chart return at end
  return svg.node();
  
}
