const populateFilters = (data) => {
    //array of filter options for screen types

    const filters_screen = [
        { id: "all", label: "All", isActive: true},
        { id: "LED", label: "LED", isActive: false},
        { id: "LCD", label: "LCD", isActive: false},
        { id: "OLED", label: "OLED", isActive: false},
    ];

    d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)

    .on("click", (e, d) => {
        console.log("clicked filter:", e);
        console.log("clicked filter data:", d);

        //if the clicked filter is not already active, update the active state of the filters
        if (!d.isActive) {
            filters_screen.forEach(filter => {
                filter.isActive = d.id === filter.id ? true : false;
            });

            d3.selectAll("#filters_screen.filter")
            .classed("active", filter => filter.id === d.id ? true : false);
        }

        updateHistogram(d.id, data);
    });
    
}