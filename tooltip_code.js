//Code for tooltip generation is imported. I couln't make it work with my own code
import {Plot} from "@mkfreeman/plot-tooltip";

// Add this as an attribute to the Plot function, like y:, sort:, or title:. Tooltip isn't perfect, but it works
title: (d) => 
        `${d.region} \n ${d.country}, ${d.location} \n ${d.startdate} - ${d.enddate} \n ${d.participants} ${d.protesteridentity} \n Protestor Demand 1: ${d.protesterdemand1}` + toolBuild(d.protesterdemand2, `Protestor Demand 2:`) + toolBuild(d.protesterdemand3, `Protestor Demand 3:`) + toolBuild(d.protesterdemand4, `Protestor Demand 4:`) + `\n State Response 1: ${d.stateresponse1}` + toolBuild(d.stateresponse2, `State Response 2:`) + toolBuild(d.stateresponse3, `State Response 3:`) + toolBuild(d.stateresponse4, `State Response 4:`) + toolBuild(d.stateresponse5, `State Response 5:`) + toolBuild(d.stateresponse6, `State Response 6:`) + toolBuild(d.stateresponse7, `State Response 7:`)

// Function helps build conditional tooltip
toolBuild = (val, valTitle) => {
  if (val == "") {
    return ""
  }
  else {
    return `\n ${valTitle} ${val}`
  }
}
