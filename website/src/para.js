var chart = d3.parsets()
      .dimensions(["Survived", "Sex", "Age", "Class"]);

var vis = d3.select("#vis").append("svg")
    .attr("width", chart.width())
    .attr("height", chart.height());

d3.csv("data/titanic.csv", function(error, csv) {
  vis.datum(csv).call(chart);
});