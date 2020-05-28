
var margin = {top: 40, right: 150, bottom: 60, left: 30},
width = 2000,
height = 1000;

// append the svg object to the body of the page
var svg5 = d3v4.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
"translate(" + 30 + "," + margin.top + ")");

//Read the data
d3v4.csv("data/first6gens_short.csv", function(data) {

  // ---------------------------//
  //       SELECT               //
  // ---------------------------//

  // List of groups (here I have one group per column)
  var xGroup = ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "capture_rate", "weight_kg", "height_cm"]
  var yGroup = ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "capture_rate", "weight_kg", "height_cm"]
  var rGroup = ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "capture_rate", "weight_kg", "height_cm"]
  var genGroup = [1,2,3,4,5,6]


  //Create 1st dropdown
  var xMenu = d3v4.select("#x_dropdown")
  xMenu.append("select")
  .selectAll('myOptions')
  .data(xGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  //Create 2nd dropdown
  var yMenu = d3v4.select("#y_dropdown")
  yMenu.append("select")
  .selectAll('myOptions')
  .data(yGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  //Create 3rd dropdown
  var rMenu = d3v4.select("#r_dropdown")
  rMenu.append("select")
  .selectAll('myOptions')
  .data(rGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  //Create 4th dropdown
  var genMenu = d3v4.select("#gen_dropdown")
  genMenu.append("select")
  .selectAll('myOptions')
  .data(genGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  const x = d3v4.scaleLinear()
  .domain([0, 240])
  .range([ 0, width ])

svg5
.append("g")
  .attr("class",'axisBlack')
  .attr("transform", "translate(0," + height + ")")
  .call(d3v4.axisBottom(x))
  .style("opacity", 1);

  // Add X axis label:
  var x_label = svg5.append("text")
  .attr("id", "x_label")
  .attr("text-anchor", "end")
  .attr("x", width-50)
  .attr("y", height+50 )
  .style("fill", "black")
  .text("Attack")
  .attr("class", "bubble_legend");

  // Add Y axis
  const y = d3v4.scaleLinear()
  .domain([0, 240])
  .range([ height, 0])

svg5
.append("g")
  .attr("class",'axisBlack')
  .call(d3v4.axisLeft(y))
  .attr("transform", "translate(0,0)")
  .style("opacity", 1);

  // Add Y axis label:
  var y_label = svg5.append("text")
  .attr("id", "y_label")
  .attr("text-anchor", "end")
  .attr("x", 0)
  .attr("y", -20 )
  .style("fill", "black")
  .text("Defense")
  .attr("class", "bubble_legend")
  .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3v4.scaleSqrt()
  .domain([1, 300])
  .range([ 3, 15]);

  //TODO: fix the order of types
  // Add a scale for bubble color
  var myColor = d3v4.scaleOrdinal()
  .domain(["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"])
  .range(["#A8A77A", //normal
  "#C22E28", //fighting
  "#A98FF3", //flying
  "#A33EA1", //poison
  "#E2BF65", //ground
  "#B6A136", //rock
  "#A6B91A", //bug
  "#735797", //ghost
  "#B7B7CE", //steel
  "#EE8130", //fire
  "#6390F0", //water
  "#7AC74C", //grass
  "#F7D02C", //electric
  "#F95587", //psychic
  "#96D9D6", //ice
  "#6F35FC", //dragon
  "#705746", //dark
  "#D685AD"]); //fairy

  // ---------------------------//
  //       SELECT UPDATE        //
  // ---------------------------//

  // A function that updates the chart
  function update(selectedX, selectedY, selectedR, selectedGen) {
    // Create new data with the selection
    var dataFilterGen = data.filter(function(d){return d.generation==parseInt(selectedGen)})
    // create an empty map and append
    var dataFilter = dataFilterGen.map(function(d){return {valueX: d[selectedX], valueY: d[selectedY],valueR: d[selectedR], type1 :d.type1, pokedex_number:d.pokedex_number , name:d.name, attack :d.attack , defense :d.defense, hp: d.hp, weight_kg:d.weight_kg, height_cm:d.height_cm, sp_attack: d.sp_attack, sp_defense: d.sp_defense, speed: d.speed}})

    //update x-axis label
    var x_label_select = document.getElementById("x_dropdown");
    var x_label = svg5.selectAll("#x_label")
    .text(x_label_select.options[x_label_select.selectedIndex].text);

    //update y-axis label
    var y_label_select = document.getElementById("y_dropdown");
    var y_label = svg5.selectAll("#y_label")
    .text(y_label_select.options[y_label_select.selectedIndex].text);

    //update circles
    var u = d3v4.select("#graphArea").selectAll("#graphCircles")
    .data(dataFilter);

    u.enter()
    .append("circle").merge(u)
    .transition()
    .duration(1000)
    .attr("cx", function(d) { return x(+[d.valueX]) })
    .attr("cy", function(d) { return y(+[d.valueY]) })
    .attr("r", function (d) { return z(+[d.valueR]); } )
    .style("fill", function (d) { return (myColor(d.type1)); } )
    .attr("class", function(d) { return "bubbles " +d.type1 })
    .attr("id", "graphCircles")

    u.exit().remove();

    d3v4.select("#graphArea").selectAll("circle").on("mouseover", showTooltip);
    d3v4.select("#graphArea").selectAll("circle").on("mousemove", moveTooltip);
    d3v4.select("#graphArea").selectAll("circle").on("mouseleave", hideTooltip);
    x_label.exit().remove();
    y_label.exit().remove();
  }

  // When the button is changed, run the updateChart function
  d3v4.select("#x_dropdown").on("change", function(d) {
    // recover the option that has been chosen
    var selectedGen = document.getElementById('gen_dropdown').value
    var selectedX = document.getElementById('x_dropdown').value;
    var selectedY = document.getElementById('y_dropdown').value;
    var selectedR = document.getElementById('r_dropdown').value;
    // run the updateChart function with this selected option
    update(selectedX, selectedY, selectedR, selectedGen)
  })

  // When the button is changed, run the updateChart function
  d3v4.select("#y_dropdown").on("change", function(d) {
    // recover the option that has been chosen
    var selectedGen = document.getElementById('gen_dropdown').value
    var selectedY = document.getElementById('y_dropdown').value;
    var selectedX = document.getElementById('x_dropdown').value;
    var selectedR = document.getElementById('r_dropdown').value;
    // run the updateChart function with this selected option
    update(selectedX, selectedY, selectedR, selectedGen)
  })

  // When the button is changed, run the updateChart function
  d3v4.select("#r_dropdown").on("change", function(d) {
    // recover the option that has been chosen
    var selectedGen = document.getElementById('gen_dropdown').value
    var selectedY = document.getElementById('y_dropdown').value;
    var selectedX = document.getElementById('x_dropdown').value;
    var selectedR = document.getElementById('r_dropdown').value;
    // run the updateChart function with this selected option
    update(selectedX, selectedY, selectedR, selectedGen)
  })

  // When the button is changed, run the updateChart function
  d3v4.select("#gen_dropdown").on("change", function(d){
    // recover the option that has been chosen
    var selectedGen = document.getElementById('gen_dropdown').value
    var selectedY = document.getElementById('y_dropdown').value;
    var selectedX = document.getElementById('x_dropdown').value;
    var selectedR = document.getElementById('r_dropdown').value;
    // run the updateChart function with this selected option
    update(selectedX, selectedY, selectedR, selectedGen)
  })

  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//
  var tooltip_Picture = d3v4.select("#my_dataviz").append("div")
  .attr("id", "tooltip_picture_div")
  .attr("width", "100")
  .attr("height", "100");
  // -1- Create a tooltip div that is hidden by default:
  var tooltip = tooltip_Picture
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .attr("width", "200px")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "black")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {

    var name = d.name.toLowerCase();
    var nameWithoutSpecialChars = name.replace("'", "\"");
    tooltip_Picture.append("div").attr("id", "pokemon_image_div").append("svg").attr("id", "pokemon_image_svg")
    .append("image")
    .attr("id","pokemon_image")
    .attr("xlink:href", "https://img.pokemondb.net/artwork/"+nameWithoutSpecialChars+".jpg")
    .attr("width", 100)
    .attr("height", 100)
    .style("background-color", "white")

    tooltip
    .transition()
    .duration(5)
    tooltip
    .style("opacity", 1)
    .style("fill", "black")
    .html("<h3> #" + d.pokedex_number + " " + d.name + "</h3> <p> <b>HP:</b> " + d.hp + " <b>Attack:</b> " + d.attack + " <b>Defense: </b>" + d.defense + " <b>Sp. Atk: </b>" + d.sp_attack + " <b>Sp. Def:</b> " + d.sp_defense + " <b>Speed: </b>" + d.speed + " <b>Weight (kg): </b>" + d.weight_kg + " <b>Height (cm):</b> " + d.height_cm + " </p>") //TODO: give as parameter
    //.style("left", (d3v4.mouse(this)[0]) + "px")
    //.style("top", (d3v4.mouse(this)[1]) + "px")


  }

  var moveTooltip = function(d) {
    tooltip
    //.style("left", (d3v4.mouse(this)[0]) + "px")
    //.style("top", (d3v4.mouse(this)[1]) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
    .transition()
    .duration(10)
    .attr("width", 100)
    .attr("height", 100)
    .style("opacity", 0)

    d3v4.select("#pokemon_image").remove();
    d3v4.select("#pokemon_image_svg").remove();
    d3v4.select("#pokemon_image_div").remove();
  }

  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3v4.selectAll(".bubbles").style("opacity", .05)
    // except the one that is hovered
    d3v4.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3v4.selectAll(".bubbles").style("opacity", 0.8)
  }

  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  var dot = svg5
  .append('g')
  .attr("id", "graphArea")
  .selectAll("dot")
  .data(data.filter(function(d){return d.generation == 1;}))
  .enter()
  .append("circle")
  .attr("class", function(d) { return "bubbles " + d.type1 })
  .attr("cx", function (d) { return x(d.attack); } )
  .attr("cy", function (d) { return y(d.defense); } )
  .attr("r", function (d) { return z(d.hp); } )
  .attr("id", "graphCircles")
  .style("fill", function (d) { return myColor(d.type1); } )
  // -3- Trigger the functions for hover
  .on("mouseover", showTooltip )
  .on("mousemove", moveTooltip )
  .on("mouseleave", hideTooltip )

  // ---------------------------//
  //       LEGEND              //
  // ---------------------------//

  // Add one dot in the legend for each name.
  var size = 20
  var firstType = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]
  svg5.selectAll("myrect")
  .data(firstType)
  .enter()
  .append("circle")
  .attr("cx", 1900)
  .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
  .attr("r", 7)
  .style("fill", function(d){ return myColor(d)})
  .on("mouseover", highlight)
  .on("mouseleave", noHighlight)

  // Add labels beside legend dots
  svg5
  .selectAll("mylabels")
  .data(firstType)
  .enter()
  .append("text")
  .attr("class", "bubble_legend")
  .attr("x", 1900 + size*.8)
  .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
  .style("fill", function(d){ return myColor(d)})
  .text(function(d){ return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "right")
  .on("mouseover", highlight)
  .on("mouseleave", noHighlight)
})
