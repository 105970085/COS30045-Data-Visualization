//Set up dimentions and margins
const margin ={ top:40, right:30, bottom:50, left:70};
const width  =800; //Total width of the chart
const height = 400; //Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

//set up colors accesible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

//set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

//create a bin generator
const binGenerator = d3.bin()
.value(d => d.energyConsumption)
