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
      case "Oceania":
        return "#002d9c";
    default:
      console.log(d["region"]);
      return "#000000";
  }
};

// Helps build tooltip
function toolBuild(val, valTitle) {
  if (val == "") {
    return ""
  }
  else {
    return `\n ${valTitle} ${val}`
  }
}

// Helps build tooltip
function violenceTooltip(val) {
  if (val == 0){
    return `\n No Violence`
  }
  else if (val == 1){
    return `\n Protester Violence`
  }
}


let flare;
d3.csv("./reduced_protest_dataV2.csv").then(
  r => {
    flare = r;
    updateChart();
  }
);

// Add any other variables for filters here
let selectViolence = "All";
let selectProtestDemand = "All";
let selectStateResponse = "All";
let selectRegion = "All";

window.onload = async () => {
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
}

d3.select('#regionDropdown')
.on('change', function() {
 selectRegion = this.value;
 updateChart();
}); 

function updateChart() {
  // If data hasn't loaded yet
  if(!flare) {
    return;
  }

  const plot = Plot.plot({
    height: screen.height * 8,
    width: screen.width * 0.5,
    y: {domain: [1990, 2020.3], ticks: d3.ticks(1990, 2020, 2020 - 1990), tickFormat: (t) => `${t}`, line: true, reverse: true, label: null, axis: "left"},
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
          if(selectViolence === "All" && selectProtestDemand === "All" && selectStateResponse === "All" && selectRegion === "All") {
            return d;
          }

          const violenceMatch = selectViolence === "All" || d["protesterviolence"] === selectViolence;

          // Check if the data point matches the protest demand filter
          const demandMatch = selectProtestDemand === "All" || d["protesterdemand1"] === selectProtestDemand;

          const stateResponseMatch = selectStateResponse === "All" || d["stateresponse1"] === selectStateResponse;

          const regionMatch = selectRegion === "All" || d["region"] === selectRegion;

          // Include the data point if it matches both filters
          return violenceMatch && demandMatch && stateResponseMatch && regionMatch? d : null;
        }),
        title: (d) => 
        `${d.region} \n ${d.country}, ${d.location} \n ${d.startdate} - ${d.enddate} \n ${d.participants} ${d.protesteridentity}` + violenceTooltip(d.protesterviolence) + `\n Protestor Demand 1: ${d.protesterdemand1}` + toolBuild(d.protesterdemand2, `Protestor Demand 2:`) + toolBuild(d.protesterdemand3, `Protestor Demand 3:`) + toolBuild(d.protesterdemand4, `Protestor Demand 4:`) + `\n State Response 1: ${d.stateresponse1}` + toolBuild(d.stateresponse2, `State Response 2:`) + toolBuild(d.stateresponse3, `State Response 3:`) + toolBuild(d.stateresponse4, `State Response 4:`) + toolBuild(d.stateresponse5, `State Response 5:`) + toolBuild(d.stateresponse6, `State Response 6:`) + toolBuild(d.stateresponse7, `State Response 7:`)
      }))
    ]
  });
  addTooltips(plot);
  
  const displayDiv = document.querySelector("#chart-display");
  const divWrapper = document.createElement("div");
  // divWrapper.className = "left-chart";

  divWrapper.append(plot);

  displayDiv.innerHTML = "";
  displayDiv.append(divWrapper);
}