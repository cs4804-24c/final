const HEIGHT = 500;
const WIDTH = 960;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;

const data = [
  { "term": "amor", "votes": 25 },
  { "term": "vida", "votes": 37 },
  { "term": "felicidad", "votes": 42 },
  { "term": "amistad", "votes": 15 },
  { "term": "familia", "votes": 30 },
  { "term": "trabajo", "votes": 18 },
  { "term": "viaje", "votes": 10 },
  { "term": "hogar", "votes": 7 },
  { "term": "salud", "votes": 33 },
  { "term": "conocimiento", "votes": 27 }
]

const TREEMAP_RADIUS = Math.min(HALF_WIDTH, HALF_HEIGHT);

const _voronoiTreemap = d3.voronoiTreemap();
let hierarchy, circlingPolygon;

const fontScale = d3.scaleLinear();

let svg, drawingArea, treemapContainer;

function init(rootData) {
  initData();
  initLayout();
  hierarchy = d3.hierarchy({ children: rootData }).sum((d) => d.votes);
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
    [0, HEIGHT]
  ];
}

function initLayout() {
  svg = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT).attr("transform", "translate(100, 100)")
  ;
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
    .attr("d", (d) => `M${d.polygon.join(",")}z`);

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
    .style("font-size", (d) => fontScale(d.data.votes));

  labels
    .append("text")
    .classed("name", true)
    .html((d) => d.data.term);
  labels
    .append("text")
    .classed("value", true)
    .text((d) => `${d.data.votes}%`);
}
