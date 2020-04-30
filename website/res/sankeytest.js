
  // PUT YOUR JavaScript CODE HERE


var units2 = "Widgets";

var margin2 = {top: 20, right: 10, bottom: 10, left: 10},
    width2 = 700 - margin2.left - margin2.right,
    height2 = 1000 - margin2.top - margin2.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units2; },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg2 = d3.select("#sankey").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin2.left + "," + margin2.top + ")")


// Set the sankey diagram properties
var sankey2 = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width2, height2]);
var path = sankey2.link();

d3.csv("data/test.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

data.forEach(function (d) {
    graph.nodes.push({ "name": d.source });
    graph.nodes.push({ "name": d.target });
    graph.links.push({ "source": d.source,
                       "target": d.target,
                       "value": +d.value });
   });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
    .key(function (d) { return d.name; })
    .object(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { "name": d };
  });
   console.log()


  sankey2
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

  // add in the links
  var link = svg2.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  // add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });


// add in the nodes
  var node = svg2.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));
 
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey2.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.name + "\n" + format(d.value); });
 
// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width2 / 2; })
      .attr("x", 6 + sankey2.nodeWidth())
      .attr("text-anchor", "start");

 
// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + (
        	   d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
        	) + "," + (
                   d.y = Math.max(0, Math.min(height2 - d.dy, d3.event.y))
            ) + ")");
    sankey2.relayout();
    link.attr("d", path);

  }




























/*

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return Math.abs(d.dy); })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = color(d.name.replace(/ .*//*, "")); })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
 




 } 

*/
});


 

/*
	(d) => {



	
	let interr = new Array(0)

	for (const [key, value] of Object.entries(d)) {
		

		if (key == "count_" || key == "fraction_%"){

			interr.push(parseInt(value))

		}else {
			interr.push(value)

			if(key == "abilities"){
				color[value] = intToRGB(hashCode(value))
			}

			

		}
  		}
  		create_graph(interr)

  		} )

  		*/
  	/*	


function create_graph(data){

	console.log(data)
}




var svg = d3.select("body").append("svg").attr("width", 960).attr("height", 800);
var g = svg.append("g").attr("transform","translate(200,50)");

var bp=viz.biPartite()
		.data(data)
		.min(12)
		.pad(1)
		.height(600)
		.width(500)
		.barSize(35)
		//.fill(d=>{color[d.primary]});

g.call(bp);

g.selectAll(".mainBars")
	.on("mouseover",mouseover)
	.on("mouseout",mouseout)

g.selectAll(".mainBars").append("text").attr("class","label")
	.attr("x",d=>(d.part=="primary"? -30: 30))
	.attr("y",d=>+6)
	.text(d=>d.key)
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
g.selectAll(".mainBars").append("text").attr("class","perc")
	.attr("x",d=>(d.part=="primary"? -100: 80))
	.attr("y",d=>+6)
	.text(function(d){ return d3.format("0.0%")(d.percent)})
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

function mouseover(d){
	bp.mouseover(d);
	g.selectAll(".mainBars")
	.select(".perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}
function mouseout(d){
	bp.mouseout(d);
	g.selectAll(".mainBars")
		.select(".perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}
d3.select(self.frameElement).style("height", "800px");





function reindex_array_keys(array, start){
    var temp = [];
    start = typeof start == 'undefined' ? 0 : start;
    start = typeof start != 'number' ? 0 : start;
    for(var i in array){
        temp[start++] = array[i];
    }
    return temp;
}
testArray = reindex_array_keys(data_);

let  er= [['Grand','WV',575,2],
['Elite','WV',368,3]];



function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}


console.log(data_)






*/


// usage example:
 


//getAsText('test.csv')


/*
right = right.filter( onlyUnique ); 
	function sort(keys){
		  var sortOrder = keys
		  return function(a,b){ return d3.ascending(sortOrder.indexOf(a),sortOrder.indexOf(b)) }
		}


		var bP = viz.biPartite()
			.sortPrimary(sort(right))
			.data(data)

		d3.select("g").call(bP)*/



/*

		var color ={Elite:"#3366CC", Grand:"#DC3912",  Lite:"#FF9900", Medium:"#109618", Plus:"#990099", Small:"#0099C6"};
		var svg = d3.select("body").append("svg").attr("width", 960).attr("height", 800);
		var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");




		var bp=viz.biPartite()
				.data(data)
				.min(12)
				.pad(1)
				.height(600)
				.width(500)
				.barSize(35)
				.fill(d=>color[d.primary]);
					
		g.call(bp);

		g.selectAll(".mainBars")
			.on("mouseover",mouseover)
			.on("mouseout",mouseout)

		g.selectAll(".mainBars").append("text").attr("class","label")
			.attr("x",d=>(d.part=="primary"? -30: 30))
			.attr("y",d=>+6)
			.text(d=>d.key)
			.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
			
		g.selectAll(".mainBars").append("text").attr("class","perc")
			.attr("x",d=>(d.part=="primary"? -100: 80))
			.attr("y",d=>+6)
			.text(function(d){ return d3.format("0.0%")(d.percent)})
			.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

		function mouseover(d){
			bp.mouseover(d);
			g.selectAll(".mainBars")
			.select(".perc")
			.text(function(d){ return d3.format("0.0%")(d.percent)})
		}
		function mouseout(d){
			bp.mouseout(d);
			g.selectAll(".mainBars")
				.select(".perc")
			.text(function(d){ return d3.format("0.0%")(d.percent)})
		}
		d3.select(self.frameElement).style("height", "800px");


*/
	//new c
