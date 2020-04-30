
var svg3 = d3.select("#bipartite2").append("svg").attr("width", 1100).attr("height", 800);


AbilitiesvsTypes()
function AbilitiesvsTypes() {

	svg3.selectAll("*").remove();

svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Abilities vs Types Count #");
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Abilities vs Types Fraction %");

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];


			const file_name1 = "data/test7.csv"


	construct_graph(file_name1,g,"Abilities","Types")

}



function TypesvsBody(){

	svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Types vs BodyShape Count #");
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Types vs BodyShape Fraction %");

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];

			const file_name2 = "data/type_vs_shape.csv"

	construct_graph(file_name2,g,"Types","Body Shape")

}


function ColorvsBody(){

	svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("BodyShape vs Color Count #");
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("BodyShape vs Color Fraction %");

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];

			const file_name3 = "data/bodyvscolor.csv"

	construct_graph(file_name3,g,"BodyShape","Color")

}






function construct_graph(file_name,g,var1,var2){



				d3.csv(file_name, function(error, data) {


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
					var color = {}
					data.forEach(function (d) {


						let interr = new Array(0)

					for (const [key, value] of Object.entries(d)) {
						

						if (key == "count" || key == "value"){

							interr.push(parseFloat(value))

						}else {

							if (key == "target" || key == "source"){
								interr.push(value)
							}

							

							if(key == "source"){
								color[value] = intToRGB(hashCode(value))
							}
						}
						
					}
					data_.push(interr)
				})
							
					console.log(data_)
						


					var bp2=[ viz.bP()
						.data(data_)
						.min(12)
						.pad(1)
						.height(600)
						.width(300)
						.barSize(35)
						.fill(d=>color[d.primary])		
					,viz.bP()
						.data(data_)
						.value(d=>d[3])
						.min(12)
						.pad(1)
						.height(600)
						.width(300)
						.barSize(35)
						.fill(d=>color[d.primary])
				];
						
				[0,1].forEach(function(i){
					g[i].call(bp2[i])
					
					g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","left").text(var1);
					g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","left").text(var2);
					
					g[i].append("line").attr("x1",-100).attr("x2",0);
					g[i].append("line").attr("x1",200).attr("x2",300);
					
					g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
					g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);
					
					g[i].selectAll(".mainBars")
						.on("mouseover",mouseover)
						.on("mouseout",mouseout);

					g[i].selectAll(".mainBars").append("text").attr("class","label")
						.attr("x",d=>(d.part=="primary"? -30: 30))
						.attr("y",d=>+6)
						.text(d=>d.key)
						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
					
					g[i].selectAll(".mainBars").append("text").attr("class","perc")
						.attr("x",d=>(d.part=="primary"? -100: 100))
						.attr("y",d=>+6)
						.text(function(d){ 

							if (i == 0) {
								return d3.format(".1f")(d.value)


							}else {
								return d3.format("0.0%")(d.percent)
							}})
							
						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
				});

				function mouseover(d){
					[0,1].forEach(function(i){
						bp2[i].mouseover(d);
						console.log(d)
						
						let format = [".1f" ,"0.0%"]
						
						if (i == 0){
							g[i].selectAll(".mainBars").select(".perc")
							.text(function(d){ return d3.format(format[i])(d.value)});

						} else {
							g[i].selectAll(".mainBars").select(".perc")
							.text(function(d){ return d3.format(format[i])(d.percent)});
						}

						
					});
				}
				function mouseout(d){
					[0,1].forEach(function(i){
						bp2[i].mouseout(d);
						
						let format = [".1f" ,"0.0%"]
						if (i == 0){
									g[i].selectAll(".mainBars").select(".perc")

							.text(function(d){ return d3.format(format[i])(d.value)});

						} else {
									g[i].selectAll(".mainBars").select(".perc")

							.text(function(d){ return d3.format(format[i])(d.percent)});
						}
					});
				}
				d3.select(self.frameElement).style("height", "800px");

				})
				} 


   ;

   // ** Update data section (Called from the onclick)
