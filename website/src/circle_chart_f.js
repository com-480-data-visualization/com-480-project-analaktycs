var sound_on = true;


/*
* this function creates a svg, this is the main svg that will contain all of the
* w is the width of the svg
* h is the height of the svg
* color is the background color
* */
function create_svg(w, h, color){


    let canvas = d3v5.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "svg_circle")

}


/*
* this function draws a sound icon
* this d3v5 element has an on click event that turns sound on and off by changing the value of the global variable sound_on
* */
function add_sound_icon(d3v5_version){
    d3v5=d3v5_version
    let pic = d3v5.select("#svg_circle")
        .append("image")
        .attr("xlink:href", "src/images/sound.png")
        .attr("x", 240)
        .attr("y", 15)
        .attr("width", 20)
        .attr("height", 20)

    if(sound_on===false){ draw_cross(240, 15, 20, 20)}

    let rect = d3v5.select("#svg_circle")
        .append("rect")
        .attr("x",240)
        .attr("y", 15)
        .attr("width", 20)
        .attr("height", 20)
        .attr("opacity", 0)
        .on("click", function(){
            sound_on = !sound_on
            if(sound_on===false){ draw_cross(240, 15, 20, 20)}
            else{d3v5.selectAll(".sound_cross").remove()}
        })


}

/*
* this function draws a cross
* the upper right corner is at coordinate (x,y)
* the height and width of the cross are defined by the variables height and width
 */
function draw_cross(x, y, width, height){
    let line_1 = d3v5.select("#svg_circle")
        .append("line")
        .attr("x1",x)
        .attr("y1",y)
        .attr("x2",x+width)
        .attr("y2",y+width)
        .style("stroke", "red")
        .style("stroke-width", 2)
        .attr("class", "sound_cross")

    let line_2 = d3v5.select("#svg_circle")
        .append("line")
        .attr("x1",x+width)
        .attr("y1",y)
        .attr("x2",x)
        .attr("y2",y+width)
        .style("stroke", "red")
        .style("stroke-width", 2)
        .attr("class", "sound_cross")


}


/*
* This calls other functions that will add all the elements to the SVG
* svg_name is the id of the svg we want to add the chart to
* csv_file is the main data file path
* gen is the default generation
* feature is the default feature
* */
function add_chart(svg_name, csv_file, gen, feature, d3v5_version){
    let size= window.innerWidth/3
    let posx=  window.innerWidth/2
    let posy=  window.innerHeight/1.8
    let diameter = size/2
    d3v5.csv(csv_file).then(function(d){
        let gen_pkm = get_gen(d, gen)
        let feat_and_pkm = get_feat(gen_pkm, feature)
        features = feat_and_pkm[0]
        pkm=feat_and_pkm[1]
        let names = pkm.map(function(k){
            return{
                name: k.name
            }
        });
        d3v5=d3v5_version
        let nb_angles = names.length
        add_sound_icon(d3v5_version)
        create_pokeball(diameter, posx, posy, d3v5_version)
        add_select_gen(gen, feature, d3v5_version)
        add_select_feature(gen, feature, d3v5_version)
        add_legend(features, d3v5_version)
        add_names_and_dots(names , nb_angles,diameter, posx, posy, pkm, feature, d3v5_version)

    })

}


/*
* this function adds the legend for the features
* the variable features is an array of string with all the possibilities in the selected feature
* */
function add_legend(features, d3v5_version){
    d3v5 = d3v5_version
    let svg7= d3v5.select("#svg_circle")
    let l = features.length
    let space = 0.5*window.innerWidth
    let interval = 50
    let start = 300
    for(let i=0; i<features.length; i++){
        let px = start+i*interval
        let legend = features[i]
        if(legend==0){
            legend="not legendary"
        }
        if(legend==1){
            legend="legendary"
        }
        let px_txt=px+10
        let leg=svg7.append("text")
            .text(legend)
            .attr("transform", "translate("+px_txt+", 25) rotate(35)")
            .style("font-size", 18)
            .style("fill", "black")
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("alignment-baseline", "central")
            .attr("id", "legend_"+i)
        let l = document.getElementById("legend_"+i).getBoundingClientRect().width*1.3


        let color = d3v5.csv("data/dot_colors.csv").then(function(d){
            let feat=features[i]
            let index = d.findIndex((k)=>{ return k.feature === feat})
            svg7.append("circle")
                .attr("cx", px)
                .attr("cy", 20)
                .attr("r", 10)
                .style("fill", d[index].color)
            svg7.append("rect")
                .attr("transform", "translate("+px+", 10) rotate(35)")
                .attr("width", l)
                .attr("height", 18)
                .attr("opacity", 0.2)
                .style("fill", d[index].color)
                .attr("class", "legend_rect")


        });

    }

}


/*
* this function is used for the animation of the pokeball
* arc is the arc that is animated
* newAngle is the final angle that the arc will have
* */
function arcTween(newAngle, arc, d3v5_version) {
    d3v5=d3v5_version
    return function(d) {
        var interpolate = d3v5.interpolate(d.endAngle, newAngle);
        return function(t) {
            d.endAngle = interpolate(t);
            return arc(d);
        }
    }
}



/*
* function that creates the pokeball with the animation of it being created
* size is the diameter of the pokeball
* the center of the pokeball is at coordinate (posx, posy)
* */
function create_pokeball(size, posx, posy, d3v5_version){

    d3v5=d3v5_version
    let base_circle = d3v5.select("#svg_circle")
    const opa=0.7

    let arc = d3v5.arc()
        .innerRadius(0)
        .outerRadius(size-8)
        .startAngle(-Math.PI/2);

    let bottom = base_circle.append("path")
        .attr("transform", "translate("+[posx, posy]+") rotate(180)")
        .attr("fill", "white")
        .attr("id", "base_circle2")
        .attr("class", "pokeball")
        .attr('opacity', opa)
        .datum({endAngle: -Math.PI/2})
        .attr("d", arc)

    bottom.transition()
        .duration(900)
        .attrTween("d", arcTween(Math.PI/2, arc, d3v5_version));

    let arc2 = d3v5.arc()
        .innerRadius(0)
        .outerRadius(size-8)
        .startAngle(Math.PI/2);

    let top = base_circle.append("path")
        .attr("transform", "translate("+[posx, posy]+") rotate(180)")
        .attr("fill", "red")
        .attr("id", "base_circle2")
        .attr("class", "pokeball")
        .attr('opacity', opa)
        .datum({endAngle: Math.PI/2})
        .attr("d", arc2)

    top.transition()
        .duration(900)
        .attrTween("d", arcTween(3*Math.PI/2, arc2, d3v5_version))


    let black_center=base_circle.append("circle")
        .attr("cx", posx)
        .attr("cy", posy)
        .attr("class", "pokeball")
        .attr("r", 0)
        .attr("fill", "black")

    black_center.transition()
        .attr("r", size/5)
        .duration(500)
        .delay(700)

    let black_line=base_circle.append("rect")
        .attr("x", posx)
        .attr("y", posy-size/20)
        .attr("width", 0)
        .attr("height", size/10)
        .attr("class", "pokeball")
        .attr("fill", "black")

    black_line.transition()
        .attr("x", posx-size+8)
        .attr("width", 2*size-16)
        .duration(500)
        .delay(700)


    let white_center=base_circle.append("circle")
        .attr("cx", posx)
        .attr("cy", posy)
        .attr("class", "pokeball")
        .attr("r", 0)
        .attr("fill", "white")

    white_center.transition()
        .attr("r", size/10)
        .duration(500)
        .delay(700)

}


/*
* this function creates circles elements and text elements and place them around a pokeball
* names is an array of pokemon names from the selected generation
* nb_angles is the length of the name array
* size is the diameter of the main circle formed by the dots
* the center of the pokéball is at coordinate (posx, posy)
* pkm is an array of all the pokémons from the chosen generation
* feature is the feature that will dictate the order of pokémons around the circle (chosen feature)
* */
function add_names_and_dots(names, nb_angles, size, posx, posy, pkm, feature, d3v5_version){
    d3v5 = d3v5_version
    let base_circle = d3v5.select("#svg_circle")
    for(let i = 0; i<nb_angles; i++){
        let nom = names[i].name
        let pokemon= pkm[i]
        let txt = base_circle.append("text")
            .text(nom)
            .attr("id", "labels_radar_"+pkm[i].pokedex_number)
            .attr("class", "labels_radar")
            .style("fill", "maroon")
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("alignment-baseline", "middle")
            .style("font-size", "75%")

        let width = txt.node().getComputedTextLength()
        let a = i*2*Math.PI/nb_angles
        let transx = posx+(size+5)*Math.cos(a)
        let transy = posy+(size+5)*Math.sin(a)
        let radius= 3*size/nb_angles
        let color ="white"

        get_color(pokemon, feature).then(function(color){
            let id = pokemon.pokedex_number
            let gen = pokemon.generation
            let dot = base_circle.append("circle")
                .attr("r", radius)
                .attr("cx", transx-(5+radius)*Math.cos(a))
                .attr("cy", transy-(5+radius)*Math.sin(a))
                .attr("fill", color)
                .attr("class", "color_circle")
                .attr("id", "circle_"+id)
                .attr("olol_x", posx)
                .attr("olol_y", posy)
                .on("mouseover", function(){
                    create_ID_card(posx, posy, pokemon, d3v5_version)
                })
                .on("click", function(){
                    let url_id = id.toString()

                    if(id<100){
                        url_id="0"+url_id
                    }
                    if(id<10){
                        url_id="0"+url_id
                    }
                    d3v5.selectAll(".info_sheet").remove()
                    move_color_circle_and_names( id, pkm, size, radius, posx, posy, d3v5_version)
                    create_info_sheet(pokemon, gen, feature, pkm, d3v5_version)
                    let name = pokemon["name"]
                    let name_url = name.charAt(0).toLowerCase()+name.slice(1)
                    if(sound_on){playSound("https://play.pokemonshowdown.com/audio/cries/"+name_url+".mp3")}
                })
                .on("mouseout", function(){
                    d3v5.selectAll(".id_card").remove()
                })
        })


        let rot= 180*a/Math.PI
        if((rot>=90) && (rot < 270)){
            txt.transition()
                .attr("text-anchor", "end")
                .duration(300)

            rot = rot+180
        }
        else{
            txt.transition()
                .attr("text-anchor", "start")
                .duration(300)

        }
        txt.attr("transform", "translate("+transx+", "+transy+") rotate("+rot+")")
    }

}


/*
* this function is used to separate a given array of pokemon into two categories
*       1) the pokemons that win against a given pokemon
*       2) the pokemons that lose against that given pokemon
* It will create two new smaller pokebals with their names and dots
* id is the pokedex number of the chosen pokemon
* pkm_list is the array of pokemons from the selected generation
* radius is the radius of the small dots
* rad is the radius of the full pokeball which center is at coordinates (posx, posy)
* */
function move_color_circle_and_names(id, pkm_list, radius, rad, posx, posy, d3v5_version){
    d3v5=d3v5_version
    duration = 3000
    looser_x= posx - window.innerWidth/3.25
    looser_y=posy-window.innerHeight/8
    winner_x=posx + window.innerWidth/3.25
    winner_y=posy-window.innerHeight/8
    let ease = d3v5.easeExp
    let winners=[]
    let loosers=[]

    d3v5.csv("data/pvpoke_1v1_cp1500_2019.csv").then(function(d){

        d3v5.selection.prototype.moveToFront = function() {
            return this.each(function(){
                this.parentNode.appendChild(this);
            });
        };

        let chosen = d[id-1]
        let len = pkm_list.length

        for(let i =0; i<len; i++){
            poke_list_id = pkm_list[i].pokedex_number
            if(chosen[poke_list_id]==1) {
                loosers.push(poke_list_id)
            }
            else if(chosen[poke_list_id]==-1){
                winners.push(poke_list_id)
            }

        }
        win=winners.length
        loss=loosers.length
        let rad_win = radius*winners.length/len
        let rad_loose = radius*loosers.length/len
        winner_y=posy-window.innerHeight/8+rad_win/2
        looser_y=posy-window.innerHeight/8+rad_loose/2
        d3v5.selectAll(".pokeball").remove()
        create_pokeball(rad_win+rad ,winner_x, winner_y, d3v5_version)
        create_pokeball(rad_loose+rad ,looser_x, looser_y, d3v5_version)

        for(let j =0; j<winners.length; j++) {
            let i = winners[j]
            let angle = 2*Math.PI*j/winners.length
            let dot = d3v5.select("#circle_"+i).moveToFront()
                .attr("olol_x", winner_x)
                .attr("olol_y", winner_y)

            let dot_x = winner_x+rad_win*Math.cos(angle)
            let dot_y = winner_y+rad_win*Math.sin(angle)
            dot.transition()
                .attr('cy', function() {
                    return dot_y

                })
                .attr('cx', function() {
                    return dot_x
                })
                .attr('r', function() {
                    return rad
                })

                .duration(function(d, j) { return duration*(j+1); })
                .ease(ease)

            let name_x = winner_x+(rad_win+rad*1.3)*Math.cos(angle)
            let name_y = winner_y+(rad_win+rad*1.3)*Math.sin(angle)
            let nom = d3v5.select("#labels_radar_"+i)
            let rot= 180*angle/Math.PI
            if((rot>=90) && (rot < 270)){
                nom.transition()
                    .attr("text-anchor", "end")
                    .duration(duration)
                rot = rot+180
            }
            else{
                nom.transition()
                    .attr("text-anchor", "start")
                    .duration(duration)
            }

            nom.transition()
                .attr("transform", "translate("+name_x+","+name_y+") rotate("+rot+")")
                .style("fill", "maroon")
                .style("font-size", "60%")
                .duration(duration)


        }


        for(let j =0; j<loosers.length; j++) {
            let i = loosers[j]
            let angle = 2*Math.PI*j/loosers.length
            let dot = d3v5.select("#circle_"+i).moveToFront()
                .attr("olol_x", looser_x)
                .attr("olol_y", looser_y)

            dot.transition()
                .attr('cy', function() {
                    return looser_y+rad_loose*Math.sin(angle)

                })
                .attr('cx', function() {
                    return looser_x+rad_loose*Math.cos(angle)
                })
                .attr('r', function() {
                    return rad
                })

                .duration(function(d, j) { return duration*(j+1); })
                .ease(ease)

            let name_x = looser_x+(rad_loose+rad*1.3)*Math.cos(angle)
            let name_y = looser_y+(rad_loose+rad*1.3)*Math.sin(angle)
            let nom = d3v5.select("#labels_radar_"+i)
            let rot= 180*angle/Math.PI
            if((rot>=90) && (rot < 270)){
                nom.transition()
                    .attr("text-anchor", "end")
                    .duration(duration)
                rot = rot+180
            }
            else{
                nom.transition()
                    .attr("text-anchor", "start")
                    .duration(duration)
            }
            nom.transition()
                .attr("transform", "translate("+name_x+","+name_y+") rotate("+rot+")")
                .style("fill", "maroon")
                .style("font-size", "60%")
                .duration(duration)



        }
        let dot = d3v5.select("#circle_"+id)
            .attr("olol_x", posx)
            .attr("olol_y", posy)
        dot.transition()
            .attr('cy', function() {
                return posy

            })
            .attr('cx', function() {
                return posx
            })
            .attr('r', function() {
                return 0
            })
            .duration(function(d, j) { return duration*(j+1); })
            .ease(ease)

        let nom = d3v5.select("#labels_radar_"+id)
        let width = window.innerWidth/4
        let height = window.innerHeight/1.5
        let posx_txt= (window.innerWidth-width)/2+width/20
        let posy_txt= (window.innerHeight)/2-window.innerWidth/6.5
        nom.transition()
            .attr("text-anchor", "start")
            .attr("transform", "translate("+posx_txt+","+posy_txt+") rotate(0)")
            .style("font-size", "150%")
            .style("fill", "black")
            .duration(duration)

    });


}


/*
* This function takes as argument a pokémon and a selected feature
* It will find what type of feature the pokemon possesses and return the corresponding color from dot_color file
* */
function get_color(pkm, feature){
    let color = d3v5.csv("data/dot_colors.csv").then(function(d){
        let feat=pkm[feature]
        let index = d.findIndex((k)=>{ return k.feature === feat})
        return d[index].color
    });
    return color
}

/*
* This function returns an array with all the pokemon from the chosen generation gen
* data is the data with all the pokemons
* */
function get_gen(data, gen){
    data_gen=[]
    for(let i=0; i<data.length; i++){
        if(data[i].generation==gen+1){
            data_gen.push(data[i])
        }
    }
    return data_gen
}


/*
* this function returns all possible values for a selected feature
* data is the data with all the pokemons
* */
function get_feat(data, feature){
    let features = []
    for(let i=0; i<data.length; i++){
        let new_ft=true;
        for(let j=0; j<features.length; j++){
            if(data[i][feature]==features[j]){
                new_ft=false;
            }
        }
        if(new_ft){
            features.push(data[i][feature])
        }
    }
    let ordered_pkm = []
    for(let j=0; j<features.length; j++) {
        for (let i = 0; i < data.length; i++) {
            if(data[i][feature]==features[j]){
                ordered_pkm.push(data[i])
            }
        }
    }
    return [features, ordered_pkm]
}


/*
* this function creates the drop down menu for the generation
* gen is the chosen gen
* feature is the chosen feature
* */
function add_select_gen(gen, feature, d3v5_version){
    d3v5 = d3v5_version
    let selection=["generation 1", "generation 2", "generation 3", "generation 4", "generation 5", "generation 6", "generation 7"]
    if(feature=="Body-Style" || feature=="Color"){
        selection =["generation 1", "generation 2", "generation 3", "generation 4", "generation 5", "generation 6"]
    }
    var l=4;
    for(i=0;i<selection.length;i++){if(l<selection[i].length)l=selection[i].length};
    var width = 400, height = 600;
    l=l*10;
    let main_svg = d3v5.select("#svg_circle")
    svg7=main_svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class","dropdown");

    let select = svg7.append("g")
        .attr("class", "select")

    select.append("rect")
        .attr("x", 10)
        .attr("y",  10 )
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");

    select.append("text")
        .attr("x", 15)
        .attr("y",30 )
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .attr("id","mydropdown")
        .text( selection[gen]);
    var options = svg7.selectAll(".myBars")
        .data(selection)
        .enter()
        .append("g");
    options.attr("class", "option").on("click", function() {
        document.getElementById("mydropdown").innerHTML=this.getElementsByTagName("text")[0].innerHTML;
        d3v5.event.stopPropagation();
        let index=0
        for(let i=0; i<selection.length;i++){
            if(this.getElementsByTagName("text")[0].innerHTML=== selection[i]){
                index = i
                break;
            }
        }
        update_chart(index, feature, d3v5_version)

    });
    options.append("rect")
        .attr("x", 10)
        .attr("y", function(d,i){ return 40 + i*30})
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");

    options.append("text")
        .attr("x", function(d){ return 15})
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .attr("y", function(d,i){ return 60 + i*30})
        .text(function(d){ return d});


}


/*
* this function creates the drop down menu for the feature
* gen is the chosen gen
* feature is the chosen feature
* */
function add_select_feature(gen, feature, d3v5_version){
    d3v5 = d3v5_version
    let selection=["Type", "Legendary", "Body-Style", "Color"]
    if(gen==6){
        selection =["Type", "Legendary"]
    }
    let features=selection
    let l = "legendary".length
    var width = 4000, height = 3000;
    l=l*10;
    px=140
    let main_svg = d3v5.select("#svg_circle")
    svg7=main_svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class","dropdown");

    let select = svg7.append("g")
        .attr("class", "select")

    select.append("rect")
        .attr("x", px)
        .attr("y",  10 )
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");
    select.append("text")
        .attr("x", px + 0.1*l)
        .attr("y",30 )
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .attr("id","mydropdown")
        .text( feature);
    var options = svg7.selectAll(".myBars")
        .data(selection)
        .enter()
        .append("g");
    options.attr("class", "option").on("click", function() {
        document.getElementById("mydropdown").innerHTML=this.getElementsByTagName("text")[0].innerHTML;
        d3v5.event.stopPropagation();
        let ft="bla"
        for(let i=0; i<selection.length;i++){
            if(this.getElementsByTagName("text")[0].innerHTML=== selection[i]) {
                ft = features[i]
                break;
            }
        }
        update_chart(gen, ft, d3v5_version)

    });
    options.append("rect")
        .attr("x", px)
        .attr("y", function(d,i){ return 40 + i*30})
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");

    options.append("text")
        .attr("x", function(d){ return px+0.1*l})
        .attr("y", function(d,i){ return 60 + i*30})
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .text(function(d){ return d});


}


/*
* this function updates the chart after the drop down menu has been used
* index is the chosen generation
* feature is the chosen feature
* it deletes the main SVG and recreates the chart
* */
function update_chart(index, feature, d3v5_version){
    d3v5.select("#svg_circle").remove()
    let w = window.innerWidth
    let h = window.innerHeight
    create_svg(w, h, "#f8f8f8")
    add_chart("svg_circle", csv_file, index, feature, d3v5_version)
}

/*
* this function calculates the arc angle of an arc centered in (cx, cy)
* x, y are the coordinates of the angle's second branch
* */
function get_angle(x, y, cx, cy){
    let dx = x-cx
    let dy = y-cy
    let a =0
    if(dx==0){
        a = Math.PI/2
        if(Math.sign(dy)<0){
            a=3*Math.PI/2
        }
    }
    else if (Math.sign(dx)==1){
        a=Math.atan(dy/dx)
        if(Math.sign(dy)<0){
            a=2*Math.PI+Math.atan(dy/dx)
        }
    }
    else {
        a=Math.atan(dy/dx)+Math.PI
    }
    return a
}


/*
* This function creates an ID card
* it is called when there's a mouse over event with the dots around a pokeball
* posx and posy are the coordinates of the center of the pokeball which the dot is around of
* pkm is the pokemon that gets mouse-overed
* */
function create_ID_card(posx, posy, pkm, d3v5_version){
    d3v5=d3v5_version
    let pkm_nbr=pkm["pokedex_number"]
    poke_circle = d3v5.select("#circle_"+pkm_nbr)


    let cx=parseInt(poke_circle.attr("cx"))
    let cy=parseInt(poke_circle.attr("cy"))
    let center_x=parseInt(poke_circle.attr("olol_x"))
    let center_y=parseInt(poke_circle.attr("olol_y"))

    let radius = Math.sqrt((cx-center_x)*(cx-center_x) + ((cy-center_y)*(cy-center_y)))
    let a=get_angle(cx, cy, center_x, center_y)
    let rect_size = radius*1.5
    let px =center_x
    let py =center_y
    if(radius<180){
        rect_size = 300
        px =center_x
        py =center_y+1.2*radius+window.innerHeight/5
    }



    let labels = ["hp", "def", "atk", "sp_def", "sp_atk", "spd"]
    let stat=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = pkm[labels[i]]
        stat[i] = d
    }
    let max_stat= Math.max(...stat)
    let nb_sep = 1
    let col = "#ffa600"
    if (max_stat > 50 && max_stat <=100){
        nb_sep = 2
        col= "#ff6361"
    }
    else if (max_stat >100 && max_stat <=150){
        nb_sep = 3
        col= "#bc5090"
    }
    else if (max_stat >150 && max_stat <=200){
        nb_sep = 4
        col= "#58508d"
    }
    else if (max_stat >200 ){
        nb_sep = 5
        col= "#003f5c"
    }

    let id_card = d3v5.select("#svg_circle")


    id_card.append("rect")
        .attr("width", 1.05*rect_size)
        .attr("height", rect_size*0.5)
        .attr("x", px-rect_size*0.525)
        .attr("y", py-rect_size/4.2)
        .attr("fill", "white")
        .attr("class", "id_card")
        .attr("stroke-width", 2)
        .attr("stroke", "black")

    let name = pkm["name"]
    let name_url = name.charAt(0).toLowerCase()+name.slice(1)
    id_card.append("rect")
        .attr("width", 1.05*rect_size)
        .attr("height", rect_size/8)
        .attr("x", px-rect_size*0.525)
        .attr("y", py-rect_size*0.363)
        .attr("fill", col)
        .attr("opacity", 0.5)
        .attr("class", "id_card")
        .attr("stroke-width", 2)
        .attr("stroke", "black")

    id_card.append("text")
        .attr("x", px-rect_size/2+5)
        .attr("y", py-rect_size*0.3)
        .style("fill", "black")
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .attr("class", "id_card")
        .text(name)

    id_card.append("image")
        .attr("xlink:href", "https://img.pokemondb.net/artwork/large/"+name_url+".jpg")
        .attr("x", px-rect_size/1.95)
        .attr("y", py-rect_size*0.2)
        .attr("width", rect_size/2.2)
        .attr("height", rect_size/2.2)
        .attr("class", "id_card")



    create_radar(pkm, 6, rect_size*0.2, px+0.25*rect_size, py, nb_sep, col, d3v5_version)
    add_data_radar(pkm, 6, rect_size*0.2, px+0.25*rect_size, py, nb_sep, col, d3v5_version)

}


/*
* This function creates an empty radar chart with the pokemon's stats
* data is the chosen pokemon
* nb_angle is the total number of stats (6)
* posx, posy are the coordinates of the radar chart
* nb_sep is the number of lines that are inside of the spider chart
* col is the color of the display
* */
function create_radar(data, nb_angles, size, posx, posy, nb_sep, col, d3v5_version){
    d3v5=d3v5_version
    let labels = ["hp", "def", "atk", "sp_def", "sp_atk", "spd"]
    let stat=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = data[labels[i]]
        stat[i] = d
    }

    let max_stat= Math.max(...stat)
    let outer_circle = 50*nb_sep

    let base_circle = d3v5.select("#svg_circle")
    let angles=[]
    let position = []
    for(let k =nb_sep; k>0; k--){
        for(let i = 0; i<=nb_angles; i++){
            let a = i*2*Math.PI/nb_angles + 3*(Math.PI)/2
            angles[i]=a
            let px=posx + size/nb_sep*k*Math.cos(a)
            let py=posy + size/nb_sep*k*Math.sin(a)
            position[i]={"x": px, "y": py}
        }
        let linefct = d3v5.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })

        base_circle.append("path")
            .attr("d", linefct(position))
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "gainsboro")
            .attr("id", "radar_base")
            .attr("class", "id_card")
    }
    let transx = posx+0.95*size
    base_circle.append("text")
        .text(outer_circle)
        .attr("transform", "translate("+transx+", "+posy+") rotate(90)")
        .attr("text-anchor", "middle")
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .attr("class", "id_card")
        .style("fill", col)


}


/*
* This function adds data to an empty spider chart
* data is the chosen pokemon
* nb_angle is the total number of stats (6)
* posx, posy are the coordinates of the radar chart
* nb_sep is the number of lines that are inside of the spider chart
* col is the color of the display
* */
function add_data_radar(data, nb_angles, size, posx, posy, nb_sep, col, d3v5_version){
    d3v5=d3v5_version
    let labels = ["hp", "def", "atk", "sp_def", "sp_atk", "spd"]
    let stat=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = data[labels[i]]
        stat[i] = d
    }

    let max_stat= Math.max(...stat)
    let outer_circle = 50*nb_sep
    let base_circle = d3v5.select("#svg_circle")
    let angles=[]
    let position = []

    for(let i = 0; i<nb_angles; i++){
        let a = i*2*Math.PI/nb_angles + 3*(Math.PI)/2
        angles[i]=a
        let px=posx + stat[i]/outer_circle*size*Math.cos(a)
        let py=posy + stat[i]/outer_circle*size*Math.sin(a)
        position[i]={"x": px, "y": py}
        transx=posx +(size+(labels[i].length)*6)*Math.cos(a) - ((labels[i].length)*3)
        transy = posy+(size+5)*Math.sin(a)+4
        rot= 90*Math.cos(a)
        base_circle.append("text")
            .attr("x", transx)
            .attr("y", transy)
            .text(labels[i])
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("class", "id_card")
            .style("fill", "maroon")

        base_circle.append("text")
            .attr("x", px)
            .attr("y", py)
            .text(stat[i])
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .style("font-size", 15)
            .attr("class", "id_card")
            .attr("alignment-baseline", "central")
            .attr("text-anchor", "middle")
            .style("fill", "black")

    }
    let linefct = d3v5.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })

    base_circle.append("path")
        .attr("d", linefct(position))
        .attr("stroke", "none")
        .attr("stroke-width", 2)
        .attr("fill", col)
        .attr("opacity", 0.5)
        .attr("class", "id_card")



}


/*
* this function creates the information sheet that pops up upon the on click event of the dots
* pkm is the pokemon that has been clicked
* index is the generation that is currently selected
* feature is the feature that is currently selected
* pkm_list is an array with all the pokemons that are in the same generation as the one selected
* */
function create_info_sheet(pkm, index, feature, pkm_list, d3v5_version){
    d3v5=d3v5_version
    let width = window.innerWidth/4
    let height = window.innerWidth/3

    let info_sheet = d3v5.select("#svg_circle")


    d3v5.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };
    let white_rect=info_sheet.append("rect")
        .attr("x", (window.innerWidth-width)/2)
        .attr("y", (window.innerHeight-height)/2+height/15)
        .attr("width", width/2)
        .attr("height", width/2+width/20)
        .attr("fill", "white")
        .attr("stroke", "black")
        .style("stroke-width", 3)
        .attr("class", "info_sheet")
        .moveToBack()
    get_color(pkm, feature).then(function(color){

        let rect=info_sheet.append("rect")
            .attr("x", (window.innerWidth-width)/2)
            .attr("y", (window.innerHeight-height)/2 )
            .attr("width", width)
            .attr("height", height)
            .attr("fill", color)
            .attr("opacity", 0.5)
            .attr("class", "info_sheet")
            .moveToBack()


        let color_band= info_sheet.append("rect")
            .attr("x", (window.innerWidth-width)/2)
            .attr("y", (window.innerHeight-height)/2 )
            .attr("width", width)
            .attr("height", height/15)
            .attr("fill", color)
            .attr("opacity", 0.5)
            .attr("class", "info_sheet")
            .moveToBack()

        let color_band_description= info_sheet.append("rect")
            .attr("x", (window.innerWidth-width)/2)
            .attr("y", (window.innerHeight)/2.05 )
            .attr("width", width)
            .attr("height", height/4.6)
            .attr("fill", color)
            .attr("opacity", 0.5)
            .attr("class", "info_sheet")
            .moveToBack()



    })

    let cross_box=info_sheet.append("rect")
        .attr("x", (window.innerWidth-width)/2+width-width/20)
        .attr("y", (window.innerHeight-height)/2 )
        .attr("width", width/20)
        .attr("height", width/20)
        .attr("fill", "black")
        .attr("class", "info_sheet")

    let line_1=info_sheet.append("line")
        .attr("x1", (window.innerWidth-width)/2+width-width/20)
        .attr("y1", (window.innerHeight-height)/2 )
        .attr("x2", (window.innerWidth-width)/2+width)
        .attr("y2", (window.innerHeight-height)/2+width/20 )
        .style("stroke", "white")
        .style("stroke-width", 2)
        .attr("class", "info_sheet")

    let line_2=info_sheet.append("line")
        .attr("x1", (window.innerWidth-width)/2+width-width/20)
        .attr("y1", (window.innerHeight-height)/2+width/20 )
        .attr("x2", (window.innerWidth-width)/2+width)
        .attr("y2", (window.innerHeight-height)/2 )
        .style("stroke", "white")
        .style("stroke-width", 2)
        .attr("class", "info_sheet")



    let name = pkm["name"]
    let name_url = name.charAt(0).toLowerCase()+name.slice(1)
    info_sheet.append("image")
        .attr("xlink:href", "https://img.pokemondb.net/artwork/large/"+name_url+".jpg")
        .attr("x", (window.innerWidth-width)/1.99)
        .attr("y", (window.innerHeight-height)/2 +width/10)
        .attr("width", width/2.1)
        .attr("height", width/2.1)
        .attr("class", "info_sheet")


    let x_txt = window.innerWidth/1.98
    let y_txt_st = (window.innerHeight-height)/2 +width/6
    let stats = ["HP", "Attack", "Defense", "Sp.Atk", "Sp.Def", "Speed"]
    let labels = ["hp", "atk", "def", "sp_atk", "sp_def", "spd"]
    let stat_val=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = pkm[labels[i]]
        stat_val[i] = d
    }
    for(let i =0; i<6; i++){
        info_sheet.append("text")
            .text(stats[i])
            .attr("x", x_txt)
            .attr("y", y_txt_st+ 1.4*i*window.innerWidth/80)
            .style("font-size", window.innerWidth/80)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .style("fill", "black")
            .attr("class", "info_sheet")

        info_sheet.append("text")
            .text(stat_val[i].toString())
            .attr("x", x_txt+0.4*width)
            .attr("y", y_txt_st+ 1.4*i*window.innerWidth/80)
            .style("font-size", window.innerWidth/80)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .style("fill", "black")
            .attr("class", "info_sheet")
    }
    info_sheet.append("text")
        .text("description")
        .attr("x", window.innerWidth/2-0.49*width)
        .attr("y", window.innerHeight/1.95)
        .style("font-size",  window.innerWidth/80)
        .attr("font-family", "Andale Mono,AndaleMono,monospace")
        .style("fill", "black")
        .attr("class", "info_sheet")
        .attr("text-decoration", "underline")

    let id_ = pkm["pokedex_number"]-1
    d3v5.csv("data/descriptions.csv").then(function(d){

        let text = d[id_].description
        let text_l = text.length
        let char_per_line = 35
        let start_line=0
        let end_line=char_per_line
        line_nbr=0
        while(end_line<=text_l){
            if(text[end_line]==" " || end_line==text_l) {
                info_sheet.append("text")
                    .text(text.slice(start_line, end_line))
                    .attr("x", (window.innerWidth-width)/2+window.innerWidth/100)
                    .attr("y", (window.innerHeight)/1.88+line_nbr*window.innerWidth/120)
                    .attr("class", "info_sheet")
                    .style("font-size",  "1vw")
                    .attr("font-family", "Andale Mono,AndaleMono,monospace")
                    .style("fill", "black")
                line_nbr+=1
                start_line=end_line+1
                end_line += char_per_line

                if(end_line>text_l){
                    end_line=text_l
                    info_sheet.append("text")
                        .text(text.slice(start_line, end_line))
                        .attr("x", (window.innerWidth-width)/2+window.innerWidth/100)
                        .attr("y", (window.innerHeight)/1.88+line_nbr*window.innerWidth/120)
                        .style("font-size",  "1vw")
                        .attr("font-family", "Andale Mono,AndaleMono,monospace")
                        .attr("class", "info_sheet")
                        .style("fill", "black")
                }
            }
            end_line++
        }


    })
    let loosers=[]
    let winners=[]
    d3v5.csv("data/pvpoke_1v1_cp1500_2019.csv").then(function(d) {
        let chosen = d[id_]
        let len = pkm_list.length
        for (let i = 0; i < len; i++) {
            poke_list_id = pkm_list[i].pokedex_number
            if (chosen[poke_list_id] == 1) {
                loosers.push(poke_list_id)
            } else if (chosen[poke_list_id] == -1) {
                winners.push(poke_list_id)
            }

        }
        info_sheet.append("text")
            .text(winners.length)
            .attr("x", (window.innerWidth)/2+window.innerWidth/100)
            .attr("y", (window.innerHeight+height)/2-height*0.1)
            .style("font-size", window.innerWidth/30)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("class", "info_sheet")
            .style("fill", "black")
        info_sheet.append("text")
            .text(loosers.length)
            .attr("x", (window.innerWidth-width)/2+window.innerWidth/100)
            .attr("y", (window.innerHeight+height)/2-height*0.1)
            .style("font-size", window.innerWidth/30)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("class", "info_sheet")
            .style("fill", "black")
        info_sheet.append("text")
            .text("defeats")
            .attr("x", (window.innerWidth)/2+window.innerWidth/100)
            .attr("y", (window.innerHeight+height)/2-height*0.25)
            .style("font-size", window.innerWidth/50)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("class", "info_sheet")
            .style("fill", "black")
        info_sheet.append("text")
            .text("victories")
            .attr("x", (window.innerWidth-width)/2+window.innerWidth/200)
            .attr("y", (window.innerHeight+height)/2-height*0.25)
            .style("font-size", window.innerWidth/50)
            .attr("font-family", "Andale Mono,AndaleMono,monospace")
            .attr("class", "info_sheet")
            .style("fill", "black")
        info_sheet.append("rect")
            .attr("x", (window.innerWidth-width)/2)
            .attr("y", (window.innerHeight)/2+height/5 )
            .attr("width", width/2)
            .attr("height", window.innerWidth/10)
            .style("fill", "none")
            .attr("stroke-opacity", 1)
            .attr("stroke", "black")
            .attr("class", "info_sheet")
        info_sheet.append("rect")
            .attr("x", (window.innerWidth)/2)
            .attr("y", (window.innerHeight)/2+height/5 )
            .attr("width", width/2)
            .attr("height", window.innerWidth/10)
            .style("fill", "none")
            .attr("stroke-opacity", 1)
            .attr("stroke", "black")
            .attr("class", "info_sheet")

    })






    let invisible_rect = info_sheet.append("rect")
        .attr("x", (window.innerWidth-width)/2+width-width/20)
        .attr("y", (window.innerHeight-height)/2 )
        .attr("width", width/20)
        .attr("height", width/20)
        .attr("opacity", 0)
        .attr("class", "info_sheet")
        .on("click", function(){
            update_chart(index-1, feature, d3v5_version)
        })
}

/*
* this function plays the sound soundFile
* it is used when there is a click event on a dot
* */
function playSound(soundfile) {
    let sound =new Audio(soundfile)
    sound.play();
}
