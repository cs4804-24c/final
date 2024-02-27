window.onload = async () => {
  let flare = [
    {
      endfrac: 1994.444,
      participantsizeindicator: 3
    },
    {
      endfrac: 1775.11,
      participantsizeindicator: 4
    },
    {
      endfrac: 1921,
      participantsizeindicator: 100
    }
  ]

  const plot = Plot.plot({
    height: 900,
    y: {line: true},
    marks: [
      Plot.dotY(flare, Plot.dodgeX({
        y: "endfrac",
        sort: "endfrac",
        r: flare.map(d => (d["participantsizeindicator"] / 2) + 1),
        title: "name",
        fill: "currentColor"
      }))
    ]
  })
  
  document.querySelector("#chart-display").append(plot);
}