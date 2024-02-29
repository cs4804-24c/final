function colorMap(d) {
  // Replace with actual column
  switch(d["region"]) {
    case "North America":
      return "#6929c4";
    case "South America":
      return "#1192e8";
    case "Europe":
      return "#005d5d"
    case "Central America":
      return "#9f1853";
    case "Africa":
      return "#fa4d56";
    case "MENA":
      return "#570408";
    case "Asia":
      return "#198038";
    default:
      console.log(d["region"]);
      return "#000000";
  }
};
  
let flare;

// Add any other variables for filters here
let selectViolence = "All";
let selectProtestDemand = "All";
let selectStateResponse = "All";

window.onload = async () => {
  flare = await d3.csv("./reduced_protest_data.csv");

  // For other filters, copy this and change variable and select tag to match the HTML for the new filter
  d3.select('#violenceDropdown')
    .on('change', function() {
     selectViolence = this.value;
     updateChart();
  }); 

  d3.select('#protestdemandDropdown')
    .on('change', function() {
     selectProtestDemand = this.value;
     updateChart();
  }); 

  d3.select('#stateresponseDropdown')
  .on('change', function() {
   selectStateResponse = this.value;
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
          if(selectViolence === "All" && selectProtestDemand === "All" && selectStateResponse === "All") {
            return d;
          }

          const violenceMatch = selectViolence === "All" || d["protesterviolence"] === selectViolence;

          // Check if the data point matches the protest demand filter
          const demandMatch = selectProtestDemand === "All" || d["protesterdemand1"] === selectProtestDemand;

          const stateResponseMatch = selectStateResponse === "All" || d["stateresponse1"] === selectStateResponse;

          // Include the data point if it matches both filters
          return violenceMatch && demandMatch && stateResponseMatch? d : null;
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