d3.csv("./data/Data_exercise 5.3.csv", d => {
  return {  
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };

}).then(data => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.Count));
    console.log(d3.min(data, d => d.Count));
    
drawDonutChart(data);

});

  const drawDonutChart = data => {
    
    //set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; //Leave some padding

    //create color scale
    const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category)) //Map screen categories
    .range(d3.schemeSet2); //use D3's category color scheme

    //calculate angle for each slice using d3.pie()
    const pie = d3.pie()
    .value(d => d.Count)
    .sort(null); //disable sorting to maintain original data order

    //set up arcs
    const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6) //inner radius = 60% of available radius
    .outerRadius(radius * 1); //outer radius = 100% of available radius

    //set up svg container
    const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black");

    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    //bind the data and create the donut chart
    innerChart
    .selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arcGenerator)
    .attr("fill", d => color(d.data.Screensize_Category)) //use category for color
    .attr("stroke", "white")
    .style("stroke-width", "2px");

    //add labels to each slice
    innerChart
    .selectAll("text")
    .data(pie(data))
    .join("text")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) //position at centroid of each slice
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .style("fill", "black")
    .text(d => `${d.data.Screensize_Category}: ${d.data.Count}`); //display category and count
  };