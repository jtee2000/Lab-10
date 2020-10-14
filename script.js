

d3.csv("coffee-house-chains.csv", d3.autoType).then(data => {
  console.log("data,", data);

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

  const x = d3
    .scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

  const y = d3.scaleLinear().range([height, 0]);
  
  
});
