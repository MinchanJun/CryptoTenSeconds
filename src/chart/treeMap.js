import * as d3 from 'd3';

export function treeMapInitialize() {
  // set the dimensions and margins of the graph
    var width = 450;
    let height = 450
    let margin = 40


    var svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "radiusSVG")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("class", "radiusG");

}

export function drawTreeMapChart(data) {
    
    let width = 450;
    let height = 450;
    let margin = 40;
    
    let svg = d3.select(".radiusG")

    let radius = Math.min(width, height) / 2 - margin

    let newData = {}
    for(let i = 0; i < data.length; i++) {
        if(data[i].name === 'Ripple'){
            newData[data[i].name] = (data[i].volume / 100).toFixed(2);
        } else if(data[i].name === 'QTUM') {
            newData[data[i].name] = (data[i].volume / 10).toFixed(2);
        } 
        else {
            newData[data[i].name] = (data[i].volume).toFixed(2);
        }
    }  

    let color = d3.scaleOrdinal()
    .domain(newData)
    .range(d3.schemeSet3);

    let pie = d3.pie()
    .value(function(d) {return d.value; })
    let data_ready = pie(d3.entries(newData))

    let pieChart = svg.selectAll("path").data(data_ready)

    pieChart
    .enter()
    .append('path')
    .merge(pieChart)
    .transition()
    .duration(1000)
    .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
    .attr('fill', function(d) { return(color(d.data.key))})
    .attr("stroke", "white")
    .attr("class", "pie")
    .style("stroke-width", "2px")
    .style("opacity", 1)

    svg.selectAll('mytext')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d) {return `${d.data.key}: ${d.data.value}`})
    .attr("transform", function(d) { return "translate(" + 
    d3.arc().innerRadius(0).outerRadius(radius).centroid(d) + ")"
    })
    .attr("class", "mytext")
    .style("text-anchor", "middle")
    .style("font-size", 10)

    pieChart
    .exit()
    .remove()
    
}

export function removePie() {
    let svg = d3.select(".radiusSVG")
    svg.selectAll("path").remove();
    svg.selectAll("mytext").remove();

}
