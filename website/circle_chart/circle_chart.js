function create_svg(w, h, color){
    console.log(d3.version)
    let width_ = window.innerWidth*w/100
    let height_ = window.innerHeight*h/100
    let canvas = d3.select("#circle_chart_div")
        .append("svg")
        .attr("width", width_)
        .attr("height", height_)
        .attr("id", "main_svg_circle")
        .style("background-color", color)

}


function add_chart(svg_name, size, color, csv_file, gen, feature, d3_version){
    let posx=  window.innerWidth*size/100
    let posy=  1.4*(window.innerHeight*size/100)
    let diameter = 6*size
    d3.csv(csv_file).then(function(d){
        let gen_pkm = get_gen(d, gen)
        let feat_and_pkm = get_feat(gen_pkm, feature)
        features = feat_and_pkm[0]
        pkm=feat_and_pkm[1]
        let names = pkm.map(function(k){
            return{
                name: k.name
            }
        });
        let nb_angles = names.length
        create_pokeball(diameter, posx, posy)
        add_select_gen(posx, posy, gen, feature, d3_version)
        add_select_feature(posx, posy, gen, feature, d3_version)
        add_names_and_dots(names , nb_angles,diameter, posx, posy, pkm, feature, d3_version)

    })

}

function create_pokeball(size, posx, posy){

    let arc = d3.arc()


    let base_circle = d3.select("#main_svg_circle")
    const opa=0.5

    base_circle.append("path")
        .attr("transform", "translate("+[posx, posy]+")")
        .attr("fill", "red")
        .attr("id", "base_circle")
        .attr('opacity', opa)
        .attr("d", arc({
            innerRadius: 10,
            outerRadius: size-8,
            startAngle: 0.5*Math.PI,
            endAngle: -0.5*Math.PI
        }))
    base_circle .append("path")
        .attr("transform", "translate("+[posx, posy]+") rotate(180)")
        .attr("fill", "white")
        .attr("id", "base_circle")
        .attr('opacity', opa)
        .attr("d", arc({
            innerRadius: 10,
            outerRadius: size-8,
            startAngle: -0.5*Math.PI,
            endAngle: 0.5*Math.PI
        }))
    base_circle.append("circle")
        .attr("cx", posx)
        .attr("cy", posy)
        .attr("r", size/5)
        .attr("fill", "black")


    base_circle.append("rect")
        .attr("x", posx-size+8)
        .attr("y", posy-size/20)
        .attr("width", 2*size-16)
        .attr("height", size/10)
        .attr("fill", "black")

    base_circle.append("circle")
        .attr("cx", posx)
        .attr("cy", posy)
        .attr("r", size/10)
        .attr("fill", "white")


}


function add_names_and_dots(names, nb_angles, size, posx, posy, pkm, feature, d3_version){
    d3 = d3_version
    let base_circle = d3.select("#main_svg_circle")
    for(let i = 0; i<nb_angles; i++){
        let nom = names[i].name
        let pokemon= pkm[i]
        let txt = base_circle.append("text")
            .text(nom)
            .attr("id", "labels_radar_"+pkm[i].pokedex_number)
            .attr("class", "labels_radar")
            .style("fill", "maroon")
        txt.attr("alignment-baseline", "middle")
        let a = i*2*Math.PI/nb_angles
        let transx = posx+(size+5)*Math.cos(a)
        let transy = posy+(size+5)*Math.sin(a)
        let radius= 3*size/nb_angles

        get_color(pokemon, feature).then(function(color){
            let id = pokemon.pokedex_number
            let dot = base_circle.append("circle")
                .attr("r", radius)
                .attr("cx", transx-(5+radius)*Math.cos(a))
                .attr("cy", transy-(5+radius)*Math.sin(a))
                .attr("fill", color)
                .attr("class", "color_circle")
                .attr("id", "circle_"+id)
                .on("mouseover", function(){
                    create_ID_card(transx, transy, size, a, pokemon)
                    })
                .on("click", function(){
                    /*move_color_circle( id, pkm, size, radius, posx, posy)*/
                    })
                .on("mouseout", function(){
                    d3.selectAll(".id_card").remove()
                })
        })


        let rot= 180*a/Math.PI
        if((rot>=90) && (rot < 270)){
            txt.attr("text-anchor", "end")
            rot = rot+180
        }
        txt.attr("transform", "translate("+transx+", "+transy+") rotate("+rot+")")
    }

}
function move_color_circle(id, pkm_list, radius, rad, posx, posy){
    duration = 3000
    looser_x= posx - window.innerWidth/4
    looser_y=posy
    winner_x=posx + window.innerWidth/4
    winner_y=posy
    let ease = d3.easeExp


    d3.csv("pvpoke_1v1_cp1500_2019.csv").then(function(d){
        let chosen = d[id-1]
        let loosers= []
        let winners= []
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
        let rad_win = radius*winners.length/len
        let rad_loose = radius*loosers.length/len
        for(let j =0; j<winners.length; j++) {
            let i = winners[j]
            let angle = 2*Math.PI*j/winners.length
            let dot = d3.select("#circle_"+i)
                .transition("playStage3")
                .attr('cy', function() {
                    return winner_y+rad_win*Math.cos(angle)

                })
                .attr('cx', function() {
                    return winner_x+rad_win*Math.sin(angle)
                })
                .attr('r', function() {
                    return rad
                })

                .duration(function(d, j) { return duration*(j+1); })
                .ease(ease)


        }
        for(let j =0; j<loosers.length; j++) {
            let i = loosers[j]
            let angle = 2*Math.PI*j/loosers.length
            let dot = d3.select("#circle_"+i)
                .transition("playStage3")
                .attr('cy', function() {
                    return looser_y+rad_loose*Math.cos(angle)

                })
                .attr('cx', function() {
                    return looser_x+rad_loose*Math.sin(angle)
                })
                .attr('r', function() {
                    return rad
                })

                .duration(function(d, j) { return duration*(j+1); })
                .ease(ease)
        }
        let dot = d3.select("#circle_"+id)
            .transition("playStage3")
            .attr('cy', function() {
                return posy

            })
            .attr('cx', function() {
                return posx
            })
            .attr('r', function() {
                return 10*rad
            })
            .duration(function(d, j) { return duration*(j+1); })
            .ease(ease)


    });



}

function get_color(pkm, feature){
    let color = d3.csv("../circle_chart/dot_colors.csv").then(function(d){
        feat=pkm[feature]
        let index = d.findIndex((k)=>{ return k.feature === feat})
        return d[index].color
    });
    return color
}

function get_gen(data, gen){
    data_gen=[]
    for(let i=0; i<data.length; i++){
        if(data[i].generation==gen+1){
            data_gen.push(data[i])
        }
    }
    return data_gen
}

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

function add_select_gen(posx, posy, gen, feature, d3_version){
    d3 = d3_version
    let selection=["generation 1", "generation 2", "generation 3", "generation 4", "generation 5", "generation 6", "generation 7"]
    var l=4;
    for(i=0;i<selection.length;i++){if(l<selection[i].length)l=selection[i].length};
    var width = 400, height = 3000;
    l=l*10;
    let main_svg = d3.select("#main_svg_circle")
    let svg=main_svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class","dropdown");

    let select = svg.append("g")
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
        .attr("id","mydropdown")
        .text( selection[gen]);
    var options = svg.selectAll(".myBars")
        .data(selection)
        .enter()
        .append("g");
    options.attr("class", "option").on("click", function() {
        document.getElementById("mydropdown").innerHTML=this.getElementsByTagName("text")[0].innerHTML;
        d3.event.stopPropagation();
        let index=0
        for(let i=0; i<selection.length;i++){
            if(this.getElementsByTagName("text")[0].innerHTML=== selection[i]){
                index = i
                break;
            }
        }
        update_chart(index, feature, d3_version)

    });
    options.append("rect")
        .attr("x", 10)
        .attr("y", function(d,i){ return 40 + i*30})
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");

    options.append("text")
        .attr("x", function(d){ return 15})
        .attr("y", function(d,i){ return 60 + i*30})
        .text(function(d){ return d});


}

function add_select_feature(posx, posy, gen, feature, d3_version){
    d3 = d3_version
    let selection=["Type", "Legendary", "Body-Style", "Color"]

    if(gen==6){
        selection =["Type", "Legendary"]
    }
    let features=selection
    let l = "legendary".length
    var width = 4000, height = 3000;
    l=l*10;
    let main_svg = d3.select("#main_svg_circle")
    svg=main_svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class","dropdown");

    let select = svg.append("g")
        .attr("class", "select")

    select.append("rect")
        .attr("x", 3/2*posx)
        .attr("y",  10 )
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");
    select.append("text")
        .attr("x", 1.51*posx)
        .attr("y",30 )
        .attr("id","mydropdown")
        .text( feature);
    var options = svg.selectAll(".myBars")
        .data(selection)
        .enter()
        .append("g");
    options.attr("class", "option").on("click", function() {
        document.getElementById("mydropdown").innerHTML=this.getElementsByTagName("text")[0].innerHTML;
        d3.event.stopPropagation();
        let ft="bla"
        for(let i=0; i<selection.length;i++){
            if(this.getElementsByTagName("text")[0].innerHTML=== selection[i]) {
                ft = features[i]
                break;
            }
        }
        update_chart(gen, ft, d3_version)

    });
    options.append("rect")
        .attr("x", 3/2*posx)
        .attr("y", function(d,i){ return 40 + i*30})
        .attr("width", l)
        .attr("height", 30)
        .attr("class","dropdown");

    options.append("text")
        .attr("x", function(d){ return 1.51*posx})
        .attr("y", function(d,i){ return 60 + i*30})
        .text(function(d){ return d});


}

function update_chart(index, feature, d3_version){
    d3.selectAll("#base_circle").remove()
    d3.select("#data_radar").remove()
    d3.selectAll(".labels_radar").remove()
    d3.select("#radar_base").remove()
    d3.selectAll(".color_circle").remove()
    d3.select("#main_svg_circle").remove()
    let csv_file="../circle_chart/data_for_circle_chart.csv"
    let screen_part = 100
    create_svg(screen_part, 1.5*screen_part, "beige")
    add_chart("main_svg_circle", screen_part/2, "beige", csv_file, index, feature, d3_version)
}

function create_ID_card(posx, posy, size, angle, pkm){
    px = posx + (size)*Math.cos(angle)
    py = posy + (2*size/3)*Math.sin(angle)

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

    let id_card = d3.select("#main_svg_circle")
    id_card.append("line")
        .attr("x1", posx)
        .attr("x2", px)
        .attr("y1", posy)
        .attr("y2", py)
        .attr("class", "id_card")
        .attr("opacity", 0.4)
        .style("stroke", "red")
        .style("stroke-width", 4)

    id_card.append("rect")
        .attr("width", 1.1*size)
        .attr("height", size/2)
        .attr("x", px-size/2)
        .attr("y", py-size/4)
        .attr("fill", "white")
        .attr("class", "id_card")
        .attr("stroke-width", 2)
        .attr("stroke", "black")

    let name = pkm["name"]
    let name_url = name.charAt(0).toLowerCase()+name.slice(1)
    id_card.append("rect")
        .attr("width", 1.1*size)
        .attr("height", size/8)
        .attr("x", px-size/2)
        .attr("y", py-size*3/8)
        .attr("fill", col)
        .attr("opacity", 0.5)
        .attr("class", "id_card")
        .attr("stroke-width", 2)
        .attr("stroke", "black")

    id_card.append("text")
        .attr("x", px-size/2+5)
        .attr("y", py-size*0.3)
        .style("fill", "black")
        .attr("class", "id_card")
        .text(name)

    id_card.append("image")
        .attr("xlink:href", "https://img.pokemondb.net/artwork/large/"+name_url+".jpg")
        .attr("x", px-size/2.05)
        .attr("y", py-size*0.24)
        .attr("width", size/2.2)
        .attr("height", size/2.2)
        .attr("class", "id_card")



    create_radar(pkm, 6, size*0.2, px+0.3*size, py, nb_sep, col)
    add_data_radar(pkm, 6, size*0.2, px+0.3*size, py, nb_sep, col)

}

function create_radar(data, nb_angles, size, posx, posy, nb_sep, col){
    let labels = ["hp", "def", "atk", "sp_def", "sp_atk", "spd"]
    let stat=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = data[labels[i]]
        stat[i] = d
    }

    let max_stat= Math.max(...stat)
    let outer_circle = 50*nb_sep

    let base_circle = d3.select("#main_svg_circle")
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
        let linefct = d3.line()
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
        .attr("class", "id_card")
        .style("fill", col)


}

function add_data_radar(data, nb_angles, size, posx, posy, nb_sep, col){
    let labels = ["hp", "def", "atk", "sp_def", "sp_atk", "spd"]
    let stat=[]
    for(let i = 0 ; i< labels.length; i++){
        let d = data[labels[i]]
        stat[i] = d
    }

    let max_stat= Math.max(...stat)
    let outer_circle = 50*nb_sep
    let base_circle = d3.select("#main_svg_circle")
    let angles=[]
    let position = []

    for(let i = 0; i<nb_angles; i++){
        let a = i*2*Math.PI/nb_angles + 3*(Math.PI)/2
        angles[i]=a
        px=posx + stat[i]/outer_circle*size*Math.cos(a)
        py=posy + stat[i]/outer_circle*size*Math.sin(a)
        position[i]={"x": px, "y": py}
        transx=posx +(size+(labels[i].length)*6)*Math.cos(a) - ((labels[i].length)*3)
        transy = posy+(size+5)*Math.sin(a)+4
        rot= 90*Math.cos(a)
        base_circle.append("text")
            .attr("x", transx)
            .attr("y", transy)
            .text(labels[i])
            .attr("class", "id_card")
            .style("fill", "maroon")

    }
    let linefct = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })

    base_circle.append("path")
        .attr("d", linefct(position))
        .attr("stroke", "none")
        .attr("stroke-width", 2)
        .attr("fill", col)
        .attr("opacity", 0.9)
        .attr("class", "id_card")



}
