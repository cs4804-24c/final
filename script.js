// Set dimensions and margins for the chart
const margin = { top: 70, right: 60, bottom: 50, left: 80 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// create tooltip div

const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip");

// Create a second tooltip div for raw date

const tooltipRawDate = d3.select("body")
  .append("div")
  .attr("class", "tooltip");

// Create our gradient  

const gradient = svg.append("defs")
  .append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("x2", "0%")
  .attr("y1", "0%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");

gradient.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#85bb65")
  .attr("stop-opacity", 1);

gradient.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#85bb65")
  .attr("stop-opacity", 0);

// Load and process the data
d3.csv("NVDA.csv").then(data => {
  // Parse the Date and convert the Close to a number
  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(d => {
    d.Date = parseDate(d.Date);
    d.Close = +d.Close;
  });

  // Set the domains for the x and y scales
  x.domain(d3.extent(data, d => d.Date));
  y.domain([0, d3.max(data, d => d.Close)]);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
      .tickValues(x.ticks(d3.timeYear.every(1)))
      .tickFormat(d3.timeFormat("%Y")))
    .selectAll(".tick line")
    .style("stroke-opacity", 1)
  svg.selectAll(".tick text")
    .attr("fill", "#777");

  // Add the y-axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${width},0)`)
    .style("font-size", "14px")
    .call(d3.axisRight(y)
      .ticks(10)
      .tickFormat(d => {
        if (isNaN(d)) return "";
        return `$${d.toFixed(2)}`;
      }))
    .selectAll(".tick text")
    .style("fill", "#777");

  // Set up the line generator
  const line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Close));

  // Create an area generator
  const area = d3.area()
    .x(d => x(d.Date))
    .y0(height)
    .y1(d => y(d.Close));

  // Add the area path
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area)
    .style("fill", "url(#gradient)")
    .style("opacity", .5);

  // Add the line path
  const path = svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#85bb65")
    .attr("stroke-width", 1)
    .attr("d", line);

  // Add a circle element

  const circle = svg.append("circle")
    .attr("r", 0)
    .attr("fill", "red")
    .style("stroke", "white")
    .attr("opacity", 0.7)
    .style("pointer-events", "none");

  // Add red lines extending from the circle to the date and value

  const tooltipLineX = svg.append("line")
    .attr("class", "tooltip-line")
    .attr("id", "tooltip-line-x")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "2,2");

  const tooltipLineY = svg.append("line")
    .attr("class", "tooltip-line")
    .attr("id", "tooltip-line-y")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "2,2");

  // create a listening rectangle

  const listeningRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height);


  // create the mouse move function

  listeningRect.on("mousemove", function (event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.Date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
    const xPos = x(d.Date);
    const yPos = y(d.Close);

    // UpDate the circle position

    circle.attr("cx", xPos).attr("cy", yPos);


    // Add transition for the circle radius

    circle.transition()
      .duration(50)
      .attr("r", 5);

    // Update the position of the red lines

    tooltipLineX.style("display", "block").attr("x1", xPos).attr("x2", xPos).attr("y1", yPos).attr("y2", height);
    tooltipLineY.style("display", "block").attr("y1", yPos).attr("y2", yPos).attr("x1", 0).attr("x2", width);


    // add in our tooltip

    tooltip
    .style("display", "block")
    // .style("left", `${width + 90}px`)
    // .style("top", `${yPos + 68}px`)
    .style("left", `${xPos+190}px`)
    .style("top", `${yPos+20}px`)
    .style("border", "1px solid green") // Green border
    .style("padding", "10px")            // Padding for some space inside the tooltip
    .style("border-radius", "5px")      // Rounded corners for the tooltip
    .style("font-size", "1em")             // Increased font size for larger text
    .style("font-weight", "bold")       // Bold font for emphasis
    .style("pointer-events", "none")    // Ensures the tooltip doesn't interfere with mouse events
      .html(`$${d.Close !== undefined ? d.Close.toFixed(2) : 'N/A'}`);


    tooltipRawDate
      .style("display", "block")
      .style("left", `${xPos + 170}px`)
      .style("top", `${height + 52}px`)
      .style("border-radius", "5px")
      .html(`${d.Date !== undefined ? d.Date.toISOString().slice(0, 10) : 'N/A'}`);

  });

  // listening rectangle mouse leave function

  listeningRect.on("mouseleave", function () {
    circle.transition().duration(50).attr("r", 0);
    tooltip.style("display", "none");
    tooltipRawDate.style("display", "none");
    tooltipLineX.attr("x1", 0).attr("x2", 0);
    tooltipLineY.attr("y1", 0).attr("y2", 0);
    tooltipLineX.style("display", "none");
    tooltipLineY.style("display", "none");
  });

  // Define the slider
  const sliderRange = d3
    .sliderBottom()
    .min(d3.min(data, d => d.Date))
    .max(d3.max(data, d => d.Date))
    .width(300)
    .tickFormat(d3.timeFormat('%Y-%m-%d'))
    .ticks(3)
    .default([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
    .fill('#85bb65');


  sliderRange.on('onchange', val => {
    // Set new domain for x scale
    x.domain(val);

    // Filter data based on slider values
    const filteredData = data.filter(d => d.Date >= val[0] && d.Date <= val[1]);

    // Update the line and area to new domain
    svg.select(".line").attr("d", line(filteredData));
    svg.select(".area").attr("d", area(filteredData));
    // Set new domain for y scale based on new data
    y.domain([0, d3.max(filteredData, d => d.Close)]);


    // Update the x-axis with new domain
    svg.select(".x-axis")
      .transition()
      .duration(300) // transition duration in ms
      .call(d3.axisBottom(x)
        .tickValues(x.ticks(d3.timeYear.every(1)))
        .tickFormat(d3.timeFormat("%Y")));

    // Update the y-axis with new domain
    svg.select(".y-axis")
      .transition()
      .duration(300) // transition duration in ms
      .call(d3.axisRight(y)
        .ticks(10)
        .tickFormat(d => {
          if (d <= 0) return "";
          return `$${d.toFixed(2)}`;
        }));

    // Remove any existing highlight
    svg.selectAll(".highlight-area").remove();

  });

  // Add the slider to the DOM
  const gRange = d3
    .select('#slider-range')
    .append('svg')
    .attr('width', 800)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(250,30)');

  gRange.call(sliderRange);

  // Add the chart title

  svg.append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left - 115)
    .attr("y", margin.top - 100)
    .style("font-size", "30px")
    .style("font-weight", "bold")
    .style("font-family", "sans-serif")
    .text("NVIDIA Corporation (NVDA)");

  //------------------------------------------------------------------------------

  // Variables to hold the selected stock prices
let firstClickPrice = null;
let secondClickPrice = null;
let firstClickPriceHolder = null;
let secondClickPriceHolder = null;
let priceDifference = null;

let firstClickDate = null;
let secondClickDate = null;


// Add a click event listener to the listening rectangle
listeningRect.on("click", function(event) {
  const [xCoord] = d3.pointer(event, this);
  const x0 = x.invert(xCoord);
  const i = d3.bisector(d => d.Date).left(data, x0, 1);
  const selectedData = data[i - 1];

  if (firstClickDate === null) {
    firstClickPrice = selectedData.Close;
    firstClickDate = selectedData.Date;
  } else {
    secondClickPrice = selectedData.Close;
    secondClickDate = selectedData.Date;
    priceDifference = secondClickPrice - firstClickPrice;

    

    // Display the price difference
    d3.select("#price-difference-container").html(
      `Buy: $${firstClickPrice.toFixed(2)}<br>
       Sell: $${secondClickPrice.toFixed(2)}`
    );

    // After calculating the price difference and updating the display, call updateCalculation
  if (secondClickPrice !== null) { 
    updateCalculation();
  }

    // Record this pair of price for calculation
    firstClickPriceHolder = firstClickPrice;
    secondClickPriceHolder = secondClickPrice;

    // Draw the highlighted area
    drawHighlightedArea(data, firstClickDate, secondClickDate);

    // Reset the click prices for the next pair of clicks
    firstClickPrice = null;
    secondClickPrice = null;
    // Reset for the next pair of clicks
    firstClickDate = null;
    secondClickDate = null;
  }
});



function drawHighlightedArea(data, firstClickDate, secondClickDate) {
  // Ensure that the dates are in the correct order
  const startDate = firstClickDate < secondClickDate ? firstClickDate : secondClickDate;
  const endDate = firstClickDate < secondClickDate ? secondClickDate : firstClickDate;

  // Filter the dataset to get the points between the two clicks
  const filteredData = data.filter(d => d.Date >= startDate && d.Date <= endDate);

  // Determine the color based on the comparison of the closing prices
  const startData = data.find(d => d.Date.getTime() === firstClickDate.getTime());
  const endData = data.find(d => d.Date.getTime() === secondClickDate.getTime());
  const fillColor = startData.Close > endData.Close ? "red" : "green";

  // Use the existing area generator to create the highlighted area
  const highlightArea = d3.area()
    .x(d => x(d.Date))
    .y0(height)
    .y1(d => y(d.Close));

  // Remove any existing highlight
  svg.selectAll(".highlight-area").remove();

  // Add the new highlight path
  svg.append("path")
    .datum(filteredData) 
    .attr("class", "highlight-area")
    .attr("d", highlightArea) 
    .attr("fill", fillColor)
    .attr("opacity", 0.5)
    .lower(); 
}


d3.select("#chart-container").append("div")
  .attr("id", "price-difference-container")
  .style("position", "absolute")
  .style("left", "50%") 
  .style("bottom", "-180px") 
  .style("transform", "translateX(-50%)") 
  .style("padding", "10px")
  .style("background", "#fff")
  .style("border", "1px solid #ddd")
  .style("border-radius", "5px")
  .style("font-size", "1.2em")
  .style("text-align", "center") // 
  .style("box-shadow", "0px 2px 4px rgba(0,0,0,0.2)"); 

  // Function to perform the multiplication and display the result
function performCalculation() {
  const multiplier = parseFloat(d3.select("#multiplier-input").property("value"));
    const priceDifference = secondClickPriceHolder - firstClickPriceHolder;
    // Update the calculation as per the new requirement
    const result = (multiplier / firstClickPriceHolder) * secondClickPriceHolder;
    // Display the updated result
    d3.select("#calculation-result").html(`Market Value: $${result.toFixed(2)}`);
}

// Event listener for the calculate button
d3.select("#calculate-button").on("click", performCalculation);

function updateCalculation() {
  const multiplier = parseFloat(d3.select("#multiplier-input").property("value"));
  // Ensure we have a valid multiplier, first price, and second price
  if (!isNaN(multiplier) && firstClickPrice !== null && secondClickPrice !== null) {
    const priceDifference = secondClickPrice - firstClickPrice;
    // Update the calculation as per the new requirement
    const result = (multiplier / firstClickPrice) * secondClickPrice;
    // Display the updated result
    d3.select("#calculation-result").html(`Market Value: $${result.toFixed(2)}`);
  }
}
  

});
