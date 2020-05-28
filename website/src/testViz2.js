

var svg3 = d3v4.select("#bipartite2").append("svg").attr("width", 800).attr("height", 800);
var generation = [1,2,3,4,5,6]
var generations = d3v4.select("#bipartite2")

						    generations
								.append("select")
								.attr("class","btn-primary")
								.selectAll("option")
						        .data(generation)
						        .enter()
						        .append("option")
						        .attr("value", function(d){
						            return d;
						        })
						        .text(function(d){
						            return "generation " + String(d);


						        })



function AbilitiesvsTypes(d3v4) {
	svg3.selectAll("*").remove();

svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Abilities and Types")
	.style("fill", 'black');




var g =svg3.append("g").attr("transform","translate(150,100)");




			const file_name1 = "data/test7_most_present_abs_test7_gen.csv"


	construct_graph(file_name1,g,"Abilities","Types",d3v4,generations,2)

}



function TypesvsBody(d3v4){

svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Types and Body styles ")
	.style("fill", 'black');


var g = svg3.append("g").attr("transform","translate(150,100)")


const file_name2 = "data/type_vs_shape_merged_gen.csv"

construct_graph(file_name2,g,"Types","Body Shape",d3v4,generations,1)

}


function ColorvsBody(d3v4){


	svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Types and Colors ").style("font-weight", 'bold')
	.style("fill", 'black');


var g = svg3.append("g").attr("transform","translate(150,100)")



			const file_name3 = "data/type_vs_colors_merged_gen.csv"

	construct_graph(file_name3,g,"Types","Color",d3v4,generations,1)

}





function construct_graph(file_name,g,var1,var2,d3v4,generations,flag){



				d3v4.csv(file_name, function(error, data) {

					function onlyUnique(value, index, self) {
						    return self.indexOf(value) === index;
						}



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

					var data_= []
					var generation = []
					var color = {}
					data.forEach(function (d) {


						let interr = new Array(0)

					for (const [key, value] of Object.entries(d)) {


						if (key == "value" || key == "values"){

							interr.push(parseFloat(value))

						}else {

							if (key == "target" || key == "source" || key == "generation"){
								interr.push(value)

							}

							if (key == 'generation'){
								generation.push(value)
							}



							if(key == "source" && flag == 1){
								color[value] = intToRGB(hashCode(value))
							}


							if(key == "target" && flag == 2){


								color[value] = intToRGB(hashCode(value))


							}
						}

					}
					data_.push(interr)
				})


					generation= generation.filter( onlyUnique );

				function initial_graph (data_,g,var1=0,var2=0,d3v4){

					const v1 = var1
					const v2 = var2


					var bp2=viz.bP()
						.data(data_)
						.min(12)
						.pad(1)
						.height(700)
						.width(400)
						.barSize(35)
						.fill(d=> (flag == 1? color[d.primary] :   color[d.secondary]));


					g.call(bp2)
						.transition()
                 			 .duration(1000)

					g.append("text").attr("x",-50).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(v1)
					.style("fill", 'black');
					g.append("text").attr("x", 450).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(v2)
						.style("fill", 'black');

					g.append("line").attr("x1",-100).transition().duration(1000).attr("x2",0);
					g.append("line").attr("x1",400).transition().duration(1000).attr("x2",550);

					g.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",-100).attr("x2",0);
					g.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",200).attr("x2",350);

					g.selectAll(".mainBars")
						.on("mouseover",mouseover)
						.on("mouseout",mouseout)
						.transition().duration(3000);

					g.selectAll(".mainBars").append("text").attr("class","label")
						.attr("x",d=>(d.part=="primary"? -30: 50))
						.attr("y",d=>+6)
						.text(d=>d.key)
						.transition()
                 			 .duration(1000)
						.style("fill", 'black')
				
						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

					g.selectAll(".mainBars").append("text").attr("class","perc")
						.attr("x",d=>(d.part=="primary"? -100: 150))
						.style("fill", 'black')
						.attr("y",d=>+6)

						.text(function(d){



								return "  "+d3v4.format("0.0%")(d.percent)
							})
						.transition()
                  			.duration(1000)

						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));




				function mouseover(d){

						bp2.mouseover(d);


							g.selectAll(".mainBars").select(".perc")
							.text(function(d){ return "   " +d3v4.format("0.0%")(d.percent)})
							.transition()
                  			.duration(1000);;
						}




				function mouseout(d){
						bp2.mouseout(d);




							g.selectAll(".mainBars").select(".perc")

							.text(function(d){ return d3v4.format("0.0%")(d.percent)})
							.transition()
                  			.duration(1000);


				}
				d3v4.select(self.frameElement).style("height", "800px");}


				 var updateGraph = function(value,data_,g,d3v4){




 		// Filter the data to include only fruit of interest
					 		var selectGen= data_.filter(function(d){
					                return d[4] == value;
					              })

							svg3.selectAll("g").remove()
								.transition()
                  			.duration(1000)
								.style("fill", 'black');


							var g =svg3.append("g").attr("transform","translate(150,100)")



					 		// Select all of the grouped elements and update the data
						    initial_graph(selectGen,g,var1,var2,d3v4)



					 	}
					 	updateGraph(selectGen=1,data_,g,d3v4)






				     	generations.on('change', function(){

 		// Find which fruit was selected from the dropdown
						 		var selectedFruit = d3v4.select(this)
						            .select("select")
						            .property("value")







						        // Run update function with the selected frit
						        updateGraph(selectedFruit,data_,g,d3v4)


						    });

				     })


				};



window.addEventListener('load', function() {
    AbilitiesvsTypes(d3v4)
})



   //Update data section (Called from the onclick)
