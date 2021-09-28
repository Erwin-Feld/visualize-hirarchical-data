<template>
  <div id="ZoomTreeGraph" ref="divRef">
    <h1>I have this prop</h1>
    <!-- <div class="limit" ref="divRef"></div> -->

    <!-- <div class="limit" ref="divRef"></div> -->
  </div>
</template>

<script>
import d3 from "@/assets/d3";

import { onMounted, ref, watch, watchEffect } from "@vue/runtime-core";

export default {
  name: "ZoomTreeGraph",
  props: ["data"],

  setup(props) {
    // const divRef = ref(null);
    const divRef = ref(null);

    // get the width and height of the div
    const getWidth = () => divRef.value.clientWidth;
    const getHeight = () => divRef.value.clientHeight;

    onMounted(() => {

   
         const selectDivRef = d3.select(divRef.value);

      const root = d3.hierarchy(props.data, function(d) {
        if (typeof d == "object")
          return Object.keys(d)
            .filter((d) => d != "$name")
            .map((k) => {
              if (typeof d[k] == "object") d[k].$name = k;
              else d[k] = k + " : " + d[k];
              return d[k];
            });
      });

  
        //   var width = getWidth();
        //   var height = getHeight();

      // *** variables **********************

      const margin = { top: 10, right: 10, bottom: 10, left: 10 };

      const dx = 60;

      let dy = 115.2;

      const width = 600;

      const tree = d3.tree().nodeSize([dx, dy]);

      const diagonal = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);

      // *** **********************


      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph();
      });

      function zoomGraph() {
          console.log("running")
        root.x0 = 0;
        root.y0 = dy / 2;
        // --> starting coordinates from the root object
        root.descendants().forEach((d, i) => {
          d.id = i;
          // TODO
          // was wird mit dem index gemacht ?
          d._children = d.children;
          if (d.depth) d.children = null;
        });
      

      const svg = d3
        .create("svg")
        .attr("width", width)
        .style("font", "10px sans-serif")
        .style("user-select", "none");

      const g = svg.append("g");
      //.attr("transform", `translate(${width / 2},${margin.top})`);

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

      setTimeout(() => zoomBehaviours.translateTo(svg, 0, 0), 100);
        // FIXME
        // --> call it if event occours --> changes the data !!!
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
          // ****changed to version 7**** 
          .on("click", (event,d) => {
              console.log(`click event ${d}`)
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
          .attr("r", 8)
          .attr("fill", (d) => (d._children ? "#555" : "#999"))
          .attr("stroke-width", 10);

        // ADDed this to work
        // TODO text habe ich umgestellt
        // passt das so ?
        nodeEnter
          .append("text")

          .text(function(d) {
            return d.data.$name || d.data;
          })
          .attr("y", -10)
          .attr("x", -10)
          .attr("text-anchor", "middle");

        // .attr("dy", "0.31em")
        // .attr("x", d => d._children ? -6 : 6)
        // .attr("text-anchor", d => d._children ? "end" : "start")
        // .text(d => d.data.name)
        // .clone(true)
        //.lower()
        //.attr("stroke-linejoin", "round")
        //.attr("stroke-width", 3)
        //.attr("stroke", "white");

        // Transition nodes to their new position.
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

    });

     



    

    watch(
      () => props.data,
      (changedValue, initalValue) => {
        console.log(initalValue);
        d3.selectAll("svg").remove();

        const selectDivRef = d3.select(divRef.value);

        const data = d3.hierarchy(changedValue, function(d) {
          if (typeof d == "object")
            return Object.keys(d)
              .filter((d) => d != "$name")
              .map((k) => {
                if (typeof d[k] == "object") d[k].$name = k;
                else d[k] = k + " : " + d[k];
                return d[k];
              });
        });

        // const data = d3.hierarchy(props.data);

        var width = 1600;
        var height = 1000;

        const margin = { left: 10, top: 10, right: 30, bottom: 80 };

        const funcReturn = stackGraph(data, margin, width, height);

        // console.log(funcReturn.node())

        d3.select(selectDivRef.node()).append(function() {
          return funcReturn;
        });

        function stackGraph(root, margin, width, height) {
          // orthogonale

          const svg = d3.create("svg");

          svg.attr("width", width).attr("height", height);

          const g = svg.append("g");

          g.attr(
            "transform",
            "translate(" + margin.left + "," + margin.right + ")"
          );

          // fill the graph
          // what are links
          // layout function

          // **** layout function *****************

          const tree = d3
            .tree()
            .size([
              height - margin.top - margin.bottom,
              width - margin.left - margin.right,
            ]);

          // **** links *****************
          const link = g

            .append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 2.5)
            .selectAll("path")
            .data(tree(root).links())
            .join("path")

            .attr(
              "d",
              d3
                .linkHorizontal()
                .x(function(d) {
                  return d.y;
                })
                .y(function(d) {
                  return d.x;
                })
            );

          //   .selectAll(".link")
          //   .data(tree(root).links())
          //  .join("path")
          //   .attr("class", "link")
          //   .attr("d", d3.linkHorizontal()
          //   .x(function(d) { return d.y; })
          //   .y(function(d) { return d.x; }));

          // **** nodes *****************
          const node = g
            .selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("class", function(d) {
              return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function(d) {
              return "translate(" + d.y + "," + d.x + ")";
            });

          node.append("circle").attr("r", 2.5);

          node
            .append("text")
            .text(function(d) {
              return d.data.$name || d.data;
            })
            .attr("y", -10)
            .attr("x", -10)
            .attr("text-anchor", "middle");

          return svg.node();
        }
      }
    );

    return { divRef };

    // return { divRef };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#treeGraph {
  overflow: hidden;
}

.limit {
  border-style: solid;
  border-color: black;
  border-width: 3px;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
