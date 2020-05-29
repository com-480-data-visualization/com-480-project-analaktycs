var chart_ = d3v3.parsets()
                        .dimensions(["types", "Body_Style", "Color","abilities"]);
var vis = d3v3.select("#tool").append("svg")
                      .attr("width", window.width)
                      .attr("height", window.height);
var generation_ = ["1","2","3","4","5","6"]
var generations_ = d3v3.select("#tool")

                generations_
                .append("select")
                .selectAll("option")
                    .data(generation_)
                    .enter()
                    .append("option")
                    .attr("value", function(d){
                        return d;
                    })
                    .text(function(d){
                        return "generation " + String(d);


                    })


var file_name = "data/parallel_data.csv"





var ice = false;

function curves() {
  var t = vis.transition().duration(100);
  if (ice) {
    t.delay(10);
    icicle();
  }
  t.call(chart_.tension(this.checked ? .5 : 1));
}

d3v3.csv(file_name, function(csv) {


    function create_intial(csv,d3v3,selectedgen,vis){


      d3v3.select('#tool').select('svg').selectAll('g').remove()




      if (selectedgen != "none"){
          csv= csv.filter(function(d){
                          return d.generation ==selectedgen ;
                        })}
          else {
            csv= csv.filter(function(d){
                          return d.generation =="1" ;
                        })
          }

var partition = d3v3.layout.partition()
    .sort(null)
    .size([chart_.width(), chart_.height() * 5 / 4])
    .children(function(d) { return d.children ? d3v3.values(d.children) : null; })
    .value(function(d) { return d.count; });




  vis.datum(csv).call(chart_);






  window.icicle = function() {
    var newIce = this.checked,
        tension = chart_.tension();
    if (newIce === ice) return;
    if (ice = newIce) {
      var dimensions = [];
      vis.selectAll("g.dimension")
         .each(function(d) { dimensions.push(d); });
      dimensions.sort(function(a, b) { return a.y - b.y; });
      var root = d3v3.parsets.tree({children: {}}, csv, dimensions.map(function(d) { return d.name; }), function() { return 1; }),
          nodes = partition(root),
          nodesByPath = {};
      nodes.forEach(function(d) {
        var path = d.data.name,
            p = d;
        while ((p = p.parent) && p.data.name) {
          path = p.data.name + "\0" + path;
        }
        if (path) nodesByPath[path] = d;
      });
      var data = [];
      vis.on("mousedown.icicle", stopClick, true)
        .select(".ribbon").selectAll("path")
          .each(function(d) {
            var node = nodesByPath[d.path],
                s = d.source,
                t = d.target;
            s.node.x0 = t.node.x0 = 0;
            s.x0 = t.x0 = node.x;
            s.dx0 = s.dx;
            t.dx0 = t.dx;
            s.dx = t.dx = node.dx;
            data.push(d);
          });
      iceTransition(vis.selectAll("path"))
          .attr("d", function(d) {
            var s = d.source,
                t = d.target;
            return ribbonPath(s, t, tension);
          })
          .style("stroke-opacity", 1);
      iceTransition(vis.selectAll("text.icicle")
          .data(data)
        .enter().append("text")
          .attr("class", "icicle")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .attr("transform", function(d) {
            return "translate(" + [d.source.x0 + d.source.dx / 2, d.source.dimension.y0 + d.target.dimension.y0 >> 1] + ")rotate(90)";
          })
          .text(function(d) { return d.source.dx > 15 ? d.node.name : null; })
          .style("opacity", 1e-6))

      iceTransition(vis.selectAll("g.dimension rect, g.category")
          .style("opacity", 1e-6))
          .each("end", function() { d3v3.select(this).attr("visibility", "hidden"); });
      iceTransition(vis.selectAll("text.dimension"))
          .attr("transform", "translate(0,-5)");
      vis.selectAll("tspan.sort").style("visibility", "hidden");
    } else {
      vis.on("mousedown.icicle", null)
        .select(".ribbon").selectAll("path")
          .each(function(d) {
            var s = d.source,
                t = d.target;
            s.node.x0 = s.node.x;
            s.x0 = s.x;
            s.dx = s.dx0;
            t.node.x0 = t.node.x;
            t.x0 = t.x;
            t.dx = t.dx0;
          });
      iceTransition(vis.selectAll("path"))
          .attr("d", function(d) {
            var s = d.source,
                t = d.target;
            return ribbonPath(s, t, tension);
          })
          .style("stroke-opacity", null);
      iceTransition(vis.selectAll("text.icicle"))
          .style("opacity", 1e-6).remove();
      iceTransition(vis.selectAll("g.dimension rect, g.category")
          .attr("visibility", null)
          .style("opacity", 1e-6));
      iceTransition(vis.selectAll("text.dimension"))
          .attr("transform", "translate(0,-25)");
      vis.selectAll("tspan.sort").style("visibility", null);
    }
  };
  d3v3.select("#icicle")
      .on("change", icicle)
      .each(icicle);


    }


    create_intial(csv,d3v3,"none",vis)


generations_.on('change', function(){


                d3v3.select('#tool').select('svg').selectAll('g').remove()
                .transition()
                          .duration(500);

    // Find which fruit was selected from the dropdown
                var selectedgen = d3v3.select(this)
                        .select("select")
                        .property("value")


                create_intial(csv,d3v3,selectedgen,vis)

                    // Run update function with the selected fruit





});

});









function iceTransition(g) {
  return g.transition().duration(1000);
}

function ribbonPath(s, t, tension) {
  var sx = s.node.x0 + s.x0,
      tx = t.node.x0 + t.x0,
      sy = s.dimension.y0,
      ty = t.dimension.y0;
  return (tension === 1 ? [
      "M", [sx, sy],
      "L", [tx, ty],
      "h", t.dx,
      "L", [sx + s.dx, sy],
      "Z"]
   : ["M", [sx, sy],
      "C", [sx, m0 = tension * sy + (1 - tension) * ty], " ",
           [tx, m1 = tension * ty + (1 - tension) * sy], " ", [tx, ty],
      "h", t.dx,
      "C", [tx + t.dx, m1], " ", [sx + s.dx, m0], " ", [sx + s.dx, sy],
      "Z"]).join("");
}

function stopClick() { d3v3.event.stopPropagation(); }

// Given a text function and width function, truncates the text if necessary to
// fit within the given width.
function truncateText(text, width) {
  return function(d, i) {
    var t = this.textContent = text(d, i),
        w = width(d, i);
    if (this.getComputedTextLength() < w) return t;
    this.textContent = "…" + t;
    var lo = 0,
        hi = t.length + 1,
        x;
    while (lo < hi) {
      var mid = lo + hi >> 1;
      if ((x = this.getSubStringLength(0, mid)) < w) lo = mid + 1;
      else hi = mid;
    }
    return lo > 1 ? t.substr(0, lo - 2) + "…" : "";
  };
}

d3v3.select("#file").on("change", function() {
  var file = this.files[0],
      reader = new FileReader;
  reader.onloadend = function() {
    var csv = d3v3.csv.parse(reader.result);
    vis.datum(csv).call(chart_
        .value(csv[0].hasOwnProperty("Number") ? function(d) { return +d.Number; } : 1)
        .dimensions(function(d) { return d3.keys(d[0]).filter(function(d) { return d !== "Number"; }).sort(); }));
  };
  reader.readAsText(file);
});
