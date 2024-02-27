Plot.plot({
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
