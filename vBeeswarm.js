function colorMap(d) {
  // Replace with actual column
  switch(d["protesterdemand1"]) {
    case "political behavior, process":
      return "#8A3FFC";
    case "land farm issue":
      return "#007D79";
    case "police brutality":
      return "#007D79";
    case "price increases, tax policy":
      return "#FF7EB6";
    case "labor wage dispute":
      return "#FA4D56";
    case "removal of politician":
      return "#FFF1F1";
    case "social restrictions":
      return "#6FDC8C";
    default:
      console.log(d["protesterdemand1"]);
      return "#000000";
  }
};
  
let flare;

// Add any other variables for filters here
let selectViolence = "All";

window.onload = async () => {
  flare = await d3.csv("./reduced_protest_data.csv");

  // For other filters, copy this and change variable and select tag to match the HTML for the new filter
  d3.select('#violenceDropdown')
    .on('change', function() {
     selectViolence = this.value;
     updateChart();
  }); 
  
  updateChart("All");
}

function updateChart() {
  const plot = Plot.plot({
    width: 3000,
    height: 900,
    y: {line: true, ticks: 0, label: null, axis: "left"},
    marks: [
      Plot.dotY(flare, Plot.dodgeX({
        y: flare.map(d => parseFloat(d["endfrac"])),
        sort: "endfrac",
        r: flare.map(d => (d["participantsizeindicator"] / 2) + 1),
        title: "name",
        fill: flare.map(d => colorMap(d)),
        filter: (d => {
          // Example of how to add new filters:
          // if(d["region"] !=== regionVar) {
          //   return null;
          // }

          // Violence or not
          if(selectViolence === "All") {
            return d;
          }
          return (d["protesterviolence"] === selectViolence) ? d : null;
        })
      }))
    ]
  });
  
  const displayDiv = document.querySelector("#chart-display");
  const divWrapper = document.createElement("div");
  divWrapper.className = "left-chart";

  divWrapper.append(plot);

  displayDiv.innerHTML = "";
  displayDiv.append(divWrapper);
}