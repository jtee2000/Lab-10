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


function update(data){
  const bars = svg.selectAll('.bar')
    .data(data);
  
  xScale.domain(data.map(d=>d.company));
  
  const groupBy = d3.select('#group-by').node().value;
  
  const value = (type)=> type==='stores'?d.stores:d.revenue;
  
  yScale.domain([0,d3.max(data,d=>groupBy==='stores'?d.stores:d.revenue)]);
  
  console.log('groupBy', groupBy);
  
  bars.enter()
    .append('rect')
    .attr('fill', '#1f76b4')
    .attr('x', d=>xScale(d.company))
    .attr('y', d=>yScale(groupBy==='stores'?d.stores:d.revenue))
    .attr('width', d=>xScale.bandwidth())
    .attr('height', d=>height-yScale(groupBy==='stores'?d.stores:d.revenue))
    
  
}
d3.csv("coffee-house-chains.csv", d3.autoType).then(data => {
  update(data);
});
