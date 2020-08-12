import * as d3 from 'd3';

export function initChart() {

    let margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right, 
    height = 400 - margin.top - margin.bottom;
    
    let svg = d3.select("#chart2")
    .append("svg")
    .attr("class", "svgs")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("text")
    .attr("x", width/3)
    .attr("y", 0 - (margin.top/2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "green")
    .text("Top 10 Cryptocurrency")


    

}

export function drawChart(data) {

    let width = 340;
    let height = 340;
    let svg = d3.select(".svgs")

    let x = d3.scaleLinear()
    .domain([0, 1300])
    .range([ 0, width]);
    
    svg.append("g")
    .attr("transform", "translate(80," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .attr("class", "xsss")
    .style("text-anchor", "end");
        
    let y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { 
            return d.name; }))
    .padding(.3);

    svg.append("g")
        .call(d3.axisRight(y))

    let bar = svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(10) )
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return 0; })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
        
    svg.selectAll("rect")
    .transition()
    .duration(300)
    .attr("x", function(d) { return x(300); })
    .attr("width", function(d) { return x(d.price); })

    
    var texts = svg.selectAll(".mytexts")
    .data(data)
    .enter()
    .append("text")
    .style("fill", "green")
    
    
    texts.attr("class", "value")
    .attr("x", 320)
    .attr("y", function(d,i) { 
    return 20 + (i * 33);        
    })
    .attr("dx", 100)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return "$" + d.price.toFixed(2) })
        
        return svg
}

export function removeText() {
    let svg = d3.select(".svgs")
    svg.selectAll("g").remove();
    svg.selectAll(".value").remove();
    svg.selectAll("rect").remove();    
}