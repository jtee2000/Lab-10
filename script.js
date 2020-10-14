const margin = { top: 20, left: 20, right: 20, bottom: 20 };
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
  

  data.sort((a, b)=>b[type] - a[type]);  
  
  xScale.domain(data.map(d=>d.company));
  
  console.log(data);
  
  
  yScale.domain([0,d3.max(data,d=>d[type])]);
  
 
  const bars = svg.selectAll('.bar')
    .data(data, d=>d.company);
  
  bars.enter()
    .append('rect')
    .attr('fill', '#1f76b4')
    .merge(bars)
    .attr('x', d=>xScale(d.company))
    .attr('y', d=>yScale(d[type]))
    .attr('width', d=>xScale.bandwidth())
    .attr('height', d=>height-yScale(d[type]))
  
  
  const xAxis = d3.axisBottom(xScale);
  
  svg.select('.x-axis')
    .call(xAxis);
  
  const yAxis = d3.axisBottom(yScale);
  
  svg.select('.y-axis')
    .call(yAxis);
}
d3.csv("coffee-house-chains.csv", d3.autoType).then(data => {
  update(data);
});
