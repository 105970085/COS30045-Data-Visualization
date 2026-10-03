const drawScatterplot = (data) => {

    //set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

    //create an innerChart group eith margins
    innerChartS = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //set up x and y scales
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth]);

    yScaleS
    .domain([0, maxEnergy])
    .range([innerHeight, 0]);

    //set up color scale
    colorScale
    .domain(data.map(d => d.screenTech))
    .range(d3.schemeCategory10);

    //add scatter points
    innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("r", 4)
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("fill", d => colorScale(d.screenTech))
    
    //add x-axis
    innerChartS
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

    //add y-axis
    innerChartS
    .append("g")
    .call(d3.axisLeft(yScaleS));

    //add x-axis label
    innerChartS
    .append("text")
    .text("Star Rating")
    .attr("x", innerWidth)
    .attr("y", innerHeight + margin.bottom - 10)
    .attr("text-anchor", "end");

    //add y-axis label
    innerChartS
    .append("text")
    .text("Labeled Energy Consumption (kWh/year)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");

    //add legend
    const legend = svg
    .append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`); //position the legend

    //loop through the color scale domain to create legend entries
    colorScale.domain().forEach((screenTech, i) => {
        
        //create a group for each legend entry
        const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`); //space rows vertically

        //add a colored rectangle for each screenTech
        legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", colorScale(screenTech));

        //add text label for each screenTech
        legendRow.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("alignment-baseline", "middle")
        .text(screenTech);
    }
)};