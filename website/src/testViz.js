var svg3 = d3.select("#bipartite2").append("svg").attr("width", 960).attr("height", 800);

svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Abilities vs Types Count #");
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Abilities vs Types Fraction %");

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];



d3.csv("data/type_vs_shape.csv", function(error, data) {



	



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
			interr.push(value)

			if(key == "source"){
				color[value] = intToRGB(hashCode(value))
			}
		}
		data_.push(interr)
	}
})
			
	console.log(data_)
		


	var bp2=[ viz.bP()
		.data(data_)
		.min(12)
		.pad(1)
		.height(600)
		.width(200)
		.barSize(35)
		.fill(d=>color[d.primary])		
	,viz.bP()
		.data(data_)
		.value(d=>d[3])
		.min(12)
		.pad(1)
		.height(600)
		.width(200)
		.barSize(35)
		.fill(d=>color[d.primary])
];
		
[0,1].forEach(function(i){
	g[i].call(bp2[i])

	console.log(g[i])
	
	g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Abilities");
	g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("Types");
	
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
			console.log(d)

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


   ;

   // ** Update data section (Called from the onclick)
function updateData() {

svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Abilities vs Types Count #");
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Abilities vs Types Fraction %");

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];


d3.csv("test7.csv", function(error, data) {





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
			interr.push(value)

			if(key == "source"){
				color[value] = intToRGB(hashCode(value))
			}
		}
		data_.push(interr)
	}
})
			
	console.log(data_)
		


	var bp2=[ viz.bP()
		.data(data_)
		.min(12)
		.pad(1)
		.height(600)
		.width(200)
		.barSize(35)
		.fill(d=>color[d.primary])		
	,viz.bP()
		.data(data_)
		.value(d=>d[3])
		.min(12)
		.pad(1)
		.height(600)
		.width(200)
		.barSize(35)
		.fill(d=>color[d.primary])
];
		
[0,1].forEach(function(i){
	g[i].call(bp2[i])
	
	g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Abilities");
	g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("Types");
	
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


