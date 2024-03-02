var legend = d3.select('.mainDiv').append('svg').attr('class', 'legend')
    .attr('height',325).attr('width',350);
var mainView = d3.select(".mainDiv")
  .append('svg').attr('class', 'mainView')
  .attr("viewBox","0 0 100 170")
  .attr('width',800).attr('height', 300)
  .attr('x', 200);
var allStates = d3.select(".allStates").attr('viewBox', '225 0 1000 1000');
const colors = ["#ed7057","#9fd9db", "#be9fcb", "#ffe982", "#90EE90"];
const brands = ["YETI", "Owala", "Stanley", "Nalgene", "Hydro Flask"];

  const margin =  {
    top: 0,
    right: 20,
    bottom: 30,
    left: 20,
  };

  
const width = allStates.attr('width');
const height = allStates.attr('height');

  //square map col/row
  const cols = 10;
  const rows = 5;

  colScale = d3.scaleBand()
  .domain(d3.range(cols))
  .range([margin.left, width-margin.left-margin.right])
  .padding(0.2);

  rowScale = d3.scaleBand()
  .domain(d3.range(rows))
  .range([margin.top, height-margin.top-margin.bottom])
  .padding(0.2);

  cellColScale = d3.scaleBand()
  .domain(d3.range(brands.length))
  .range([0, colScale.bandwidth()])
  .padding(0);
  
  
  allStates.append("text")
  .attr('class', 'yLabel')
  .attr('x', -600)
  .attr('y', 0)
  .attr('transform', 'rotate(-90)')
  .attr('font-size', 50)
  .text('Trend Score')
  

  const state_size = colScale.bandwidth();
  const state_padding = 10;

projection = ([column, row]) => [
  column * (state_size + state_padding),
  row * (state_size + state_padding)
]

const layout = new Map([
  ["AL", [6, 5]],
  ["AK", [1, 6]],
  ["AZ", [1, 4]],
  ["AR", [4, 4]],
  ["CA", [0, 3]],
  ["CO", [2, 3]],
  ["CT", [9, 2]],
  ["DC", [8, 4]],
  ["DE", [9, 3]],
  ["FL", [8, 6]],
  ["GA", [7, 5]],
  ["HI", [0, 6]],
  ["ID", [1, 1]],
  ["IL", [5, 1]],
  ["IN", [5, 2]],
  ["IA", [4, 2]],
  ["KS", [3, 4]],
  ["KY", [5, 3]],
  ["LA", [4, 5]],
  ["ME", [10, -1]],
  ["MD", [8, 3]],
  ["MA", [9, 1]],
  ["MI", [6, 1]],
  ["MN", [4, 1]],
  ["MS", [5, 5]],
  ["MO", [4, 3]],
  ["MT", [2, 1]],
  ["NE", [3, 3]],
  ["NV", [1, 2]],
  ["NH", [10, 0]],
  ["NJ", [8, 2]],
  ["NM", [2, 4]],
  ["NY", [8, 1]],
  ["NC", [6, 4]],
  ["ND", [3, 1]],
  ["OH", [6, 2]],
  ["OK", [3, 5]],
  ["OR", [0, 2]],
  ["PA", [7, 2]],
  ["RI", [10, 2]],
  ["SC", [7, 4]],
  ["SD", [3, 2]],
  ["TN", [5, 4]],
  ["TX", [3, 6]],
  ["UT", [1, 3]],
  ["VT", [9, 0]],
  ["VA", [7, 3]],
  ["WA", [0, 1]],
  ["WV", [6, 3]],
  ["WI", [5, 0]],
  ["WY", [2, 2]]
]);


legend.append('rect')
  .attr('height',320)
  .attr('width', 325)
  .attr('stroke','black')
  .attr('fill', 'none');

  legend.append('text')
  .attr('x', 70)
  .attr('y', 20)
  .attr('font-size', 20)
  .text("legend");

const render = data =>{
  const yetiAvg = d3.mean(data, d=>d.YETI);
  const owalaAvg = d3.mean(data, d=>d.Owala);
  const hydroAvg = d3.mean(data, d=>d.HydroFlask);
  const stanleyAvg = d3.mean(data, d=>d.Stanley);
  const nalgeneAvg = d3.mean(data, d=>d.Nalgene);
  
  brandAvg = [yetiAvg, owalaAvg, stanleyAvg, nalgeneAvg, hydroAvg];
  for(let i = 0; i < brands.length; i++){
    legend.append('rect')
    .attr('width', 40)
    .attr('height', 20)
    .attr('x', 20)
    .attr('y', 30*i+30)
    .attr('fill', colors[i]);
  
    legend.append('text')
    .attr('x', 80)
    .attr('y', 30*i+45)
    .attr('font-size', 20)
    .text(brands[i] + "  (mean = " + brandAvg[i] + ")");
  }

  legend.append('line')
        .attr('x1', 100)
        .attr('x2', 100+colScale.bandwidth())
        .attr('y1', 300)
        .attr('y2', 300)
        .attr('stroke', 'black');
    //add yAxis
    legend.append('line')
        .attr('x1',  100)
        .attr('x2',  100)
        .attr('y1',  300)
        .attr('y2', 200)
        .attr('stroke', 'black');

      legend.append("rect")
        .attr('width', cellColScale.bandwidth())
        .attr('height', brandAvg[0])
        .attr("x", 100 + cellColScale(0))
        .attr('y', 300-(brandAvg[0]))
        .attr('fill', colors[0]);
        
        legend.append("rect")
        .attr('width', cellColScale.bandwidth())
        .attr('height', brandAvg[1])
        .attr("x", 100 + cellColScale(1))
        .attr('y', 300-(brandAvg[1]))
        .attr('fill', colors[1]);
    
        legend.append("rect")
        .attr('width', cellColScale.bandwidth())
        .attr('height', brandAvg[2])
        .attr("x", 100 + cellColScale(2))
        .attr('y', 300-(brandAvg[2]))
        .attr('fill', colors[2]);
    
        legend.append("rect")
        .attr('width', cellColScale.bandwidth())
        .attr('height', brandAvg[3])
        .attr("x", 100 + cellColScale(3))
        .attr('y', 300-(brandAvg[3]))
        .attr('fill', colors[3]);
    
        legend.append("rect")
        .attr('width', cellColScale.bandwidth())
        .attr('height', brandAvg[4])
        .attr("x", 100 + cellColScale(4))
        .attr('y', 300-(brandAvg[4]))
        .attr('fill', colors[4]);
      

    d3.select("body").append("button")
    .attr("x", 50)
    .attr("y", 0)
    .text("See Map")
    .on("click", changeVis);
     
    const cells = allStates.selectAll('g')
      .data(data)
      .join('g')
      .attr('class', 'cells')
      .attr('id', (d) =>d.Region)
      .attr('iNum', (d,i)=>i)
      .attr('transform', (d, i) => {

          /* i is the current index
             in this case, the value of i will be from 0-25. */
          // get the row index and column index for this cell
          const r = Math.floor(i / cols);
          const c = i % cols;
          // use the scales to get the x, y coordinates
          return `translate(${colScale(c)}, ${rowScale(r)})`;
        });
    
    //add xAxis
    function build(data){
    cells.append('line')
        .attr('x1', 0)
        .attr('x2', colScale.bandwidth())
        .attr('y1', rowScale.bandwidth())
        .attr('y2', rowScale.bandwidth())
        .attr('stroke', 'black');
    //add yAxis
    cells.append('line')
        .attr('x1',  0)
        .attr('x2',  0)
        .attr('y1',  0)
        .attr('y2', rowScale.bandwidth())
        .attr('stroke', 'black');
    //add state title
    cells.append('text')
    .attr('y', rowScale.bandwidth()+20)
    .attr('font-size', 20)
    .text((d)=>d.Region)
    
    //yeti
    cells.append("rect")
    .attr('id', "YETI")
    .attr('width', cellColScale.bandwidth())
    .attr('height', (d)=>(d.YETI))
    .attr("x", cellColScale(0))
    .attr('y', (d)=>rowScale.bandwidth()-(d.YETI))
    .attr('fill', colors[0])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave);

    
    cells.append("rect")
    .attr('id', "Owala")
    .attr('width', cellColScale.bandwidth())
    .attr('height', (d)=>(d.Owala))
    .attr("x", cellColScale(1))
    .attr('y', (d)=>rowScale.bandwidth()-(d.Owala))
    .attr('fill', colors[1])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave);

    cells.append("rect")
    .attr('id', "Stanley")
    .attr('width', cellColScale.bandwidth())
    .attr('height', (d)=>(d.Stanley))
    .attr("x", cellColScale(2))
    .attr('y', (d)=>rowScale.bandwidth()-(d.Stanley))
    .attr('fill', colors[2])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave);

    cells.append("rect")
    .attr('id', "Nalgene")
    .attr('width', cellColScale.bandwidth())
    .attr('height', (d)=>(d.Nalgene))
    .attr("x", cellColScale(3))
    .attr('y', (d)=>rowScale.bandwidth()-(d.Nalgene))
    .attr('fill', colors[3])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave);

    cells.append("rect")
    .attr('id', "HydroFlask")
    .attr('width', cellColScale.bandwidth())
    .attr('height', (d)=>(d.HydroFlask))
    .attr("x", cellColScale(4))
    .attr('y', (d)=>rowScale.bandwidth()-(d.HydroFlask))
    .attr('fill', colors[4])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave);
    }

    build(data);
    

    cells.on('click', function(event, d){
      if(d3.select(this.parentNode).attr('class')=="allStates"){
      enlarge(this,d);
    }
    });

    function clearMainView(){
      var pastChild = mainView.selectAll('*');
      if(pastChild.node() != null){
       allStates.append(function(){ return pastChild.node()});
       pastChild.selectAll('*').remove();
       pastChild.attr('transform', (d, i) => {
        const r = Math.floor(pastChild.attr('iNum') / cols);
        const c = pastChild.attr('iNum') % cols;
        // use the scales to get the x, y coordinates
        return `translate(${colScale(c)}, ${rowScale(r)})`;
       });
       build(pastChild.data);
      }
    }

    function enlarge(newChild,d){
      console.log(newChild);
      clearMainView() 
      build(d);
      var largeChart = mainView.append(function(){return newChild});
      largeChart.attr('transform','translate(0,0)');
    }

    function changeVis(){
      clearMainView();
      //return to row view
      if(d3.select('.mainView').style('display') == "none"){
        d3.select(".allStates").attr('viewBox', '225 0 1000 1000');
        allStates.select('.yLabel').style('display', 'inline')
        d3.select(".mainView").style('display','inline');
        cells.transition()
        .duration(1000)
        .attr('transform', (d,i)=> {
          const r = Math.floor(i / cols);
          const c = i % cols;
          // use the scales to get the x, y coordinates
          return `translate(${colScale(c)}, ${rowScale(r)})`;
        });
        build(data);

        cells.on('click', function(event, d){
          if(d3.select(this.parentNode).attr('class')=="allStates"){
          enlarge(this,d);
        }
        });
      }
      //change to map view
      else{
        d3.select(".allStates").attr('viewBox', '100 -175 1500 1500');
        d3.select('.mainView').style("display", 'none')
        allStates.select('.yLabel').style('display', 'none')
        cells.transition()
          .duration(1000)
          .attr("transform", (d,i) => { 
            const coord = projection(layout.get(d.Region)).join(',');
            return 'translate('+coord+')';
          });
        cells.on('click', console.log());
        
      }
    }

     // create a tooltip
  var Tooltip = d3.selectAll('div')
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  Tooltip
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity",1)
}
var mousemove = function(e,d) {
  Tooltip
    .html(d3.select(this).attr('id') + ": " + d3.select(this).attr('height'))
    .style("top", e.clientX + "px")
    .style("left", e.clientY + "px")
}
var mouseleave = function(d) {
  Tooltip
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8)
}

d3.select('#search').on('click', showState);

  function showState(){
    var state = d3.select('#textBox').property('value');
    var stateCell = allStates.select("#"+state)
    stateCell.attr('transform', 'translate(0,0)');
    clearMainView();
    console.log();
    mainView.node().append(stateCell.node());
    
  
  }

    return allStates.node();      
}
d3.csv('/RatingsByState.csv')
  .then(
    data => {
    data.forEach(d => {
      d.Region = d.Region;
      d.Stanley = +d.Stanley;
      d.YETI = +d.YETI;
      d.HydroFlask = +d.HydroFlask;
      d.Nalgene = +d.Nalgene;
      d.Owala = +d.Owala;
  });
    render(data);
});
