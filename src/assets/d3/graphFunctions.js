

// takes json and js objects trnasforms them
//  for d3.hirarchy function exabtable
function makeDataHirarchic(d) {
  if (typeof d == "object")
    return Object.keys(d)
      .filter((d) => d != "$name")
      .map((k) => {
        if (typeof d[k] == "object") d[k].$name = k;
        else d[k] = k + " : " + d[k];
        return d[k];
      });
}



 function zoomGraph(d3, root, dx, dy, divRef, transmitData) {
    // d3 --> library
    //  root --> data transformed hirarchically
    // dx --> starting x coordinates
    // dy --> starting y coordinates
  // divRef ref for parent div container 

  // maps the nodes
  const tree = d3.tree().nodeSize([dx, dy]);

  //  horizontal positiion of the graph
  const diagonal = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x);

    // ****************


  root.x0 = 0;
  root.y0 = dy / 2;
  // --> starting coordinates from the root object
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth) d.children = null;
  });

  const svg = d3
    .create("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("width", "100%")
    .attr("height", "100%")
    .classed("svg-graph", true)
    .style("font", "7px monospace")
    .style("user-select", "none");

  const g = svg
    .append("g")
    // positon of g element
    .attr("class", "parent-g");

  const gLink = g
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

  // **************** zoom event ************************

  const gNode = g
    .append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");

  const zoomBehaviours = d3
    .zoom()
    .scaleExtent([0.05, 3])

    .on("zoom", (event, d) => {
      //  https://observablehq.com/@d3/d3v6-migration-guide
      // ****changed to version 7****
      g.attr("transform", event.transform);
      //   console.log(d3.event.transform);
    });

  svg.call(zoomBehaviours);

  setTimeout(() => {
    // gets reactive size  of parent width
    const parentWidth = divRef.value.clientWidth;
    const parentHeight = divRef.value.clientHeight;
    zoomBehaviours.translateTo(svg, parentWidth / 4, parentHeight / 6), 100;
  });

  update(root);

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Compute the new tree layout.
    tree(root);

    const transition = svg
      .transition()
      .duration(duration)
      .tween(
        "resize",
        window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
      );

    // Update the nodes…
    const node = gNode.selectAll("g").data(nodes, (d) => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      //  .attr("classed", (d) => (d._children ? "node" : "leaf"))
      // ****changed to version 7****
      .on("click", (event, d) => {
        // console.log(`click event ${d}`)
        d.children = d.children ? null : d._children;
        update(d);
        // ****changed to version 7****
        if (event && event.altKey) {
          setTimeout(() => {
            zoomToFit();
          }, duration + 100);
          //zoomToFit();
        }
      });

    const nodeShape = nodeEnter
      .append("circle")
      .attr("classed", (d) => (d._children ? "node-" : "leaf"))
      // .attr("r", 8)
      .attr("r", (d) => (d._children ? 6 : 3))
      // Lab***************
      .attr("fill", (d) => (d._children ? "none" : "#999"))
      .attr("stroke", (d) => (d._children ? "#F8485E" : "#999"))
      .attr("stroke-width", 3);
    
      if (Array.isArray(transmitData)) {
        nodeEnter
        .append("text")
        .text(function(d) {
          return d.data.$name || d.data;
        })
        .attr("y", -10)
        .attr("x", -10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
         // Add add root text on start if data is array  
         .attr("text-anchor", d => d.data ? "end" : "start")

      } else {

        nodeEnter
        .append("text")
        .text(function(d) {
          return d.data.$name || d.data;
        })
        .attr("y", -10)
        .attr("x", -10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("text-anchor", "middle");

      }

    // nodeEnter
    //   .append("text")
    //   .text(function(d) {
    //     return d.data.$name || d.data;
    //   })
    //   .attr("y", -10)
    //   .attr("x", -10)
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-width", 3)
    //  
    //    .attr("text-anchor", d => d.data ? "end" : "start")
    //   // .attr("text-anchor", "middle");

    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
      .exit()
      .transition(transition)
      .remove()
      .attr("transform", (d) => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path").data(links, (d) => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .append("path")
      .attr("d", (d) => {
        const o = { y: source.x0, x: source.y0 };
        return diagonal({ source: o, target: o });
      });
    // Transition links to their new position.
    link
      .merge(linkEnter)
      .transition(transition)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .remove()
      .attr("d", (d) => {
        const o = { y: source.x, x: source.y };
        return diagonal({ source: o, target: o });
      });

    // Stash the old positions for transition.
    root.eachBefore((d) => {
      d.y0 = d.x;
      d.x0 = d.y;
    });
  }

  function zoomToFit(paddingPercent) {
    const bounds = g.node().getBBox();
    const parent = svg.node().parentElement;
    const fullWidth = parent.clientWidth;
    const fullHeight = parent.clientHeight;

    const width = bounds.width;
    const height = bounds.height;

    const midX = bounds.x + width / 2;
    const midY = bounds.y + height / 2;

    if (width == 0 || height == 0) return; // nothing to fit

    const scale =
      (paddingPercent || 0.75) /
      Math.max(width / fullWidth, height / fullHeight);
    const translate = [
      fullWidth / 2 - scale * midX,
      fullHeight / 2 - scale * midY,
    ];

    const transform = d3.zoomIdentity
      .translate(translate[0], translate[1])
      .scale(scale);

    svg
      .transition()
      .duration(500)
      .call(zoomBehaviours.transform, transform);
  }

  return svg.node();
}


export {zoomGraph, makeDataHirarchic}




