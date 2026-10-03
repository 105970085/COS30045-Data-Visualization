const drawHistogram = (data) => {
    //set the dimentions and margins of the chart
    const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

    //create an inner chart group with margins
    const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Get the bins for the histogram
    const bins = binGenerator(data);
    console.log(bins); // Log the bins to the console for debugging

    //calculate the minimum an dmaximum energy consumption values from the bins to set the xScale domain
    const minEng = bins[0].x0; //lower bound of the first bin
    const maxEng = bins[bins.length - 1].x1; //upper bound of the last bins

    //calculate the maximum length of the bins to set the yScale domain
    const binMaxLength = d3.max(bins, d => d.length);

    console.log("minEng:", minEng, " maxEng:", maxEng, " binMaxLength:", binMaxLength); // Log the min and max energy consumption values and the maximum bin length for debugging

    //set the domain and ranges for the x and y scales
    xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

    yScale
    .domain([0, binMaxLength])
    .range([innerHeight, 0])
    .nice(); //use the nice() method to round the y-axisvalues to a more human-readble format

    innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);
    
    
    //add y-axis label
    innerChart
    .append("text")
    .text("Frequency")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");

    //add x-axis label
    innerChart
    .append("text")
    .text("Labeled Energy Consumption (kWh)")
    .attr("x", innerWidth)
    .attr("y", innerHeight + margin.bottom - 10)
    .attr("text-anchor", "end");

    //add axes
    innerChart
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

    innerChart
    .append("g")
    .attr("class", "axis y-axis")
    .call(d3.axisLeft(yScale));
};


const updateHistogram =(filterId, data) => {

    const updatedData = filterId === "all"
    ? data
    : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect")

    .data(updatedBins)
    .transition()
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("y", d => yScale(d.length))
    .attr("height", d => innerHeight - yScale(d.length));
};
