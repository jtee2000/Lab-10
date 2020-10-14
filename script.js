d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
  
  console.log('data,', data);
  
  const margin = { top:20, left:20, right:20, bottom:20 }
  const width = 600 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;
  
  d3.select('.chart').append
})