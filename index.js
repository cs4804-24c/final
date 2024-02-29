const HEIGHT = 500;
const WIDTH = 960;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;

const data = [
  { name: "China", weight: 14.84, color: "#ffffcc" },
  { name: "Japan", weight: 5.91, color: "#ffcc99" },
  { name: "India", weight: 2.83, color: "#ffcccc" },
  { name: "South Korea", weight: 1.86, color: "#ff99cc" },
  { name: "Russia", weight: 1.8, color: "#ffccff" },
  { name: "Indonesia", weight: 1.16, color: "#cc99ff" },
  { name: "Turkey", weight: 0.97, color: "#ccccff" },
  { name: "Saudi Arabia", weight: 0.87, color: "#99ccff" },
  { name: "Iran", weight: 0.57, color: "#ccffff" },
  { name: "Thaïland", weight: 0.53, color: "#99ffcc" },
  { name: "UAE", weight: 0.5, color: "#ccffcc" },
  { name: "Hong Kong", weight: 0.42, color: "#ccff99" },
];

var svg = d3;

const TREEMAP_RADIUS = Math.min(HALF_WIDTH, HALF_HEIGHT);

const _voronoiTreemap = d3.voronoiTreemap();
let hierarchy, circlingPolygon;

const fontScale = d3.scaleLinear();

let drawingArea, treemapContainer;

function init(rootData) {
  initData();
  initLayout();
  hierarchy = d3.hierarchy({ children: rootData }).sum((d) => d.weight);
  _voronoiTreemap.clip(circlingPolygon)(hierarchy);

  drawTreemap(hierarchy);
}

init(data);

function initData() {
  circlingPolygon = computeCirclingPolygon();
  fontScale.domain([3, 20]).range([8, 20]).clamp(true);
}

function computeCirclingPolygon() {
  return [
    [0, 0],
    [WIDTH, 0],
    [WIDTH, HEIGHT],
    [0, HEIGHT],
  ];
}

function initLayout() {
  svg = d3
    .select("#simpleVoronoi")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("transform", "translate(0, 30)");
  drawingArea = svg.append("g").classed("drawingArea", true);
  treemapContainer = drawingArea.append("g").classed("treemap-container", true);

  treemapContainer
    .append("path")
    .classed("world", true)
    .attr("transform", `translate(${-TREEMAP_RADIUS}, ${-TREEMAP_RADIUS})`)
    .attr("d", `M${circlingPolygon.join(",")}Z`);
}

function drawTreemap(hierarchy) {
  const leaves = hierarchy.leaves();

  treemapContainer
    .append("g")
    .classed("cells", true)
    .selectAll(".cell")
    .data(leaves)
    .enter()
    .append("path")
    .classed("cell", true)
    .attr("d", (d) => `M${d.polygon.join(",")}z`)
    .style("stroke", "black")
    .style("stroke-width", "4px")
    .style("fill", (d) => d.data.color);

  const labels = treemapContainer
    .append("g")
    .classed("labels", true)
    .selectAll(".label")
    .data(leaves)
    .enter()
    .append("g")
    .classed("label", true)
    .attr(
      "transform",
      (d) => `translate(${d.polygon.site.x}, ${d.polygon.site.y})`
    )
    .style("font-size", (d) => fontScale(d.data.weight)*1.8);

  labels
    .append("text")
    .classed("name", true)
    .html((d) => d.data.name);
  labels
    .append("text")
    .classed("value", true)
    .text((d) => `${d.data.weight}%`);
}
