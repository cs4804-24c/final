function colorMap(d) {
  // Replace type with actual column
  switch(d["type"]) {
    case "A":
      return "#FF0000";
    case "B":
      return "#00FF00";
    case "C":
      return "#0000FF";
    default:
      return "#000000";
  }
};

window.onload = async () => {
  let flare = [
    {
      endfrac: 1994.444,
      participantsizeindicator: 3,
      type: "A"
    },
    {
      endfrac: 1775.11,
      participantsizeindicator: 4,
      type: "C"
    },
    {
      endfrac: 1921,
      participantsizeindicator: 100,
      type: "B"
    },
    {
      endfrac: 1921,
      participantsizeindicator: 4,
      type: "A"
    },
    {
      endfrac: 1840,
      participantsizeindicator: 6,
      type: "EEEEEEEE"
    }
  ]

  const plot = Plot.plot({
    height: 900,
    y: {line: true, ticks: 0, label: null, axis: "left"}, // Replace with axis: "right" for flipped version
    marks: [
      Plot.dotY(flare, Plot.dodgeX({
        y: "endfrac",
        sort: "endfrac",
        r: flare.map(d => (d["participantsizeindicator"] / 2) + 1),
        title: "name",
        fill: flare.map(d => colorMap(d))
      }))
    ]
  })
  
  document.querySelector("#chart-display").append(plot);
}