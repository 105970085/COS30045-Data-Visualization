//Load the csv data and call the function to create the bar chart
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert to number
    screenTech: d.screenTech,
    star: +d.star,
    energyConsumption: +d.energyConsumption
})).then(function(data) {
    console.log(data); // Log the data to the console for debugging

    drawHistogram(data);
    populateFilters(data);

    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});