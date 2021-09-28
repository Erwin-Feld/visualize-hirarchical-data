
import d3 from "./index";



var width = 600;
var height = 300;

const margin = {left: 10, top: 10, right: 50, bottom: 50}

var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

      

var g = svg.append("g").attr('transform','translate('+ margin.left +','+ margin.right +')');

var tree = d3.tree()
    .size([height-margin.top-margin.bottom,width-margin.left-margin.right]);

 var link = g.selectAll(".link")
    .data(tree(root).links())
    .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
          .x(function(d) { return d.y; })
          .y(function(d) { return d.x; }));

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 2.5);
      
  node.append("text")
     .text(function(d) { return d.data.$name || d.data; })
     .attr('y',-10)
     .attr('x',-10)
     .attr('text-anchor','middle');




    function stackGraph(root, margin, width, height){

            // orthogonale

            const svg = d3.create("svg")

            svg
            .attr("width", width )
            .attr("height", height)

            const g = svg.append("g")

            g
            .attr('transform','translate('+ margin.left +','+ margin.right +')');

            // fill the graph
            // what are links 
            // layout function
            

              // **** layout function *****************

            const tree = d3.tree()
            .size([height-margin.top-margin.bottom,width-margin.left-margin.right]);

            // **** links *****************
            const link = g.selectAll(".link")
            .data(tree(root).links())
           .join("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
            .x(function(d) { return d.y; })
            .y(function(d) { return d.x; }));


            // **** nodes *****************
            const node = g.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })


            node.append("circle")
            .attr("r", 2.5);
            
        node.append("text")
           .text(function(d) { return d.data.$name || d.data; })
           .attr('y',-10)
           .attr('x',-10)
           .attr('text-anchor','middle');


           return svg

    }

    