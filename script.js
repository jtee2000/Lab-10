const margin = { top: 20, left: 50, right: 20, bottom: 20 };
const width = 600 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);

const yScale = d3.scaleLinear().range([height, 0]);

svg.append('g')
  .attr('class', 'axis x-axis')
  .attr("transform", "translate(0," + height + ")");

svg.append('g')
  .attr('class', 'axis y-axis');


function update(data){
  const type = d3.select('#group-by').node().value;
  console.log('type', type);

  data.sort((a, b)=>b[type] - a[type]);  
  
  xScale.domain(data.map(d=>d.company));
  
  console.log(xScale.domain())
  
  
  yScale.domain([0, d3.max(data,d=>d[type])]);
  
  
  
 
  const bars = svg.selectAll('.bar')
    .data(data, d=>d.company);
  
  bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', '#1f76b4')
    .attr('x', d=>xScale(d.company))
    .attr('width', d=>xScale.bandwidth())
  	.attr("height",0)
	  .attr("y",height)
    .merge(bars)
    .transition()
    .delay((d,i)=>i*100)
    .duration(1000)
    .attr('x', d=>xScale(d.company))
    .attr('y', d=>yScale(d[type]))
    .attr('height', d=>height-yScale(d[type]))
  
  
  const xAxis = d3.axisBottom(xScale);
  
  svg.select('.x-axis')
    .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale);
  
  svg.select('.y-axis')
    .call(yAxis);
}

let data;
d3.csv("coffee-house-chains.csv", d3.autoType).then(_data => {
  data = _data;
  update(data);
});


d3.select('#group-by').on('change', (event)=>{
  update(data);
})