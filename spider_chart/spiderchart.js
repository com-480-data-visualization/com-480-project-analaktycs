function create_svg(w, h, id, color){
    let width_ = window.innerWidth*w/100
    let height_ = window.innerHeight*h/100
    let canvas = d3.select("body")
        .append("svg")
        .attr("width", width_)
        .attr("height", height_)
        .attr("id", id)
        .style("background-color", color)

}

function add_chart(svg_name, size, color, csv_file, index){
    let posx=  window.innerWidth*size/100
    let posy=  window.innerHeight*size/100
    let diameter = posy*2/3




    d3.csv(csv_file).then(function(d){
        let names = d.map(function(k){
            return{
                name: k.name
            }
        });
        let nb_angles = d.columns.length-1
        create_radar(nb_angles, diameter, posx, posy, 3)
        add_select(names, d, posx, posy, index)
        add_data(index, d, nb_angles, diameter, posx, posy)
        add_name(names[index].name , posx, posy, 200, 50)
    })

}
function create_radar(nb_angles, size, posx, posy, nb_sep){
    let base_circle = d3.select("svg")
    let angles=[]
    let position = []
    for(let k =nb_sep; k>0; k--){
        for(let i = 0; i<=nb_angles; i++){
            let a = i*2*Math.PI/nb_angles + 3*(Math.PI)/2
            angles[i]=a
            px=posx + size/nb_sep*k*Math.cos(a)
            py=posy + size/nb_sep*k*Math.sin(a)
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
            .attr("id", "radar_base");
    }
}
function add_data(index, data, nb_angles, size, posx, posy){
    let labels = (data.columns)
    labels.splice(0, 1)
    let stat=[]
    for(let i = 1 ; i<= labels.length; i++){
        let d = d3.entries(data[index])
        stat[i-1]=d[i].value
    }
    data.forEach(function(row){
        labels.push(Object.keys(row))
    });
    let base_circle = d3.select("svg")
    let angles=[]
    let position = []
    for(let i = 0; i<nb_angles; i++){
        let a = i*2*Math.PI/nb_angles + 3*(Math.PI)/2
        angles[i]=a
        px=posx + stat[i]/30*size*Math.cos(a)
        py=posy + stat[i]/30*size*Math.sin(a)
        position[i]={"x": px, "y": py}
        transx=posx +(size+(labels[i].length)*6)*Math.cos(a) - ((labels[i].length)*3)
        transy = posy+(size+5)*Math.sin(a)
        rot= 90*Math.cos(a)
        base_circle.append("text")
            .attr("x", transx)
            .attr("y", transy)
            .text(labels[i])
            .attr("id", "labels_radar")
            .style("fill", "maroon")
    }
    let linefct = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })

    base_circle.append("path")
        .attr("d", linefct(position))
        .attr("stroke", "none")
        .attr("stroke-width", 2)
        .attr("fill", "peru")
        .attr("opacity", 0.9)
        .attr("id", "data_radar")
}
function add_name(name, posx, posy, width, height){
    let txt = "stats of "+name
    let l = txt.length
    let w= l*20
    let svg = d3.select("svg")
    svg.append("rect")
        .attr("x", posx-w/2)
        .attr("y", posy*5/3+30)
        .attr("width", w)
        .attr("height", height)
        .attr("fill", "sienna")
        .attr("id", "rect_title")
    svg.append("text")
        .attr("x", posx-(15*l/2))
        .attr("y", posy*5/3+height/2+12+30)
        .attr("fill", "beige")
        .attr("font-size", 40)
        .attr("id", "text_title")
        .text(txt)

}
function add_select(names, data, posx, posy, nbr){
    selection=[]
    for(let i=0; i<data.length; i++){
        selection[i]=data[i].name
    }
    var l=4;
    for(i=0;i<selection.length;i++){if(l<selection[i].length)l=selection[i].length};
    var width = 400, height = 300;
    l=l*10;
    let main_svg = d3.select("#spider")
    svg=main_svg.append("svg")
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
        .attr("height", 30);
    select.append("text")
        .attr("x", 15)
        .attr("y",30 )
        .attr("id","mydropdown")
        .text( selection[nbr]);
    var options = svg.selectAll(".myBars")
        .data(selection)
        .enter()
        .append("g");
    options.attr("class", "option").on("click", function() {
        document.getElementById("mydropdown").innerHTML=this.getElementsByTagName("text")[0].innerHTML;
        d3.event.stopPropagation();
        let index=0
        for(let i=0; i<names.length;i++){
            if(this.getElementsByTagName("text")[0].innerHTML=== names[i].name) {
                index = i
                break;
            }
        }
        update_chart(index)

    });
    options.append("rect")
        .attr("x", 10)
        .attr("y", function(d,i){ return 40 + i*30})
        .attr("width", l)
        .attr("height", 30);

    options.append("text")
        .attr("x", function(d){ return 15})
        .attr("y", function(d,i){ return 60 + i*30})
        .text(function(d){ return d});


}

function update_chart(index){
    d3.select("#rect_title").remove()
    d3.select("#text_title").remove()
    d3.select("#data_radar").remove()
    d3.select("#labels_radar").remove()
    d3.select("#radar_base").remove()
    let csv_file="bro_data.csv"
    let screen_part = 100
    add_chart("spider", screen_part/2, "beige", csv_file, index)
}