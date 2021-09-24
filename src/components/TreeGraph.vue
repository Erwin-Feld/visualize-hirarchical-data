<template>
  <div id="treeGraph">
    <h1>I have this prop</h1>
    <div class="limit" ref="divRef"></div>

    <!-- <div class="limit" ref="divRef"></div> -->
  </div>
</template>

<script>
import d3 from "@/assets/d3";

import { onMounted, ref, watch } from "@vue/runtime-core";
import { hierarchy } from "d3-hierarchy";

// import { initialValue } from './initalValue'
// import { dataTransformation, graph } from '../assets/d3/d3.custom-functions'

export default {
  name: "TreeGraph",
  props: ["data"],

  setup(props) {
    // const divRef = ref(null);
    const divRef = ref(null);

    onMounted(() => {
      const selectDivRef = d3.select(divRef.value);

      const data = d3.hierarchy(props.data, function(d) {
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

      function dataTransformation(d) {
        if (typeof d == "object")
          return Object.keys(d)
            .filter((d) => d != "$name")
            .map((k) => {
              if (typeof d[k] == "object") d[k].$name = k;
              else d[k] = k + " : " + d[k];
              return d[k];
            });
      }

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

      // const dx = 12;

      //   const dy = 120;

      // data

      // const treeLayout = d3.tree().nodeSize([dx, dy]);

      // // TEST
      // const funcReturn = graph(data);

      // d3.select(selectDivRef.node()).append(function() {
      //   return funcReturn;
      // });

      //    const selectDiv = d3.select(divRef.value);

      //     selectDiv

      //       .selectAll("svg")
      //       .data(Object.values(props.data))
      //       .join("svg")
      //       .classed("sex", true)

      //       // .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
      //       // .append("rect")
      //       // .attr("width", 20 + "px")
      //       // .attr("height", 20 + "px")
      //       // .attr("fill", d3.color("orange"));
      // console.log("finished")
      function graph(
        root,
        {
          // label = d => d.data.id,
          // highlight = () => false,
          marginLeft = 40,
        } = {}
      ) {
        // Research -- deconstructing  line 32

        // Research -- linkHorizontal  was macht das
        // WHY unklar
        const treeLink = d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x);

        // geändert Treelayout
        root = treeLayout(root);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
          if (d.x > x1) x1 = d.x;
          if (d.x < x0) x0 = d.x;
        });

        const svg = d3
          .create("svg")
          // .classed("graph", true)
          .attr("viewBox", [0, 0, 33, x1 - x0 + dx * 2])
          .style("overflow", "visible");

        const g = svg
          .append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("transform", `translate(${marginLeft},${dx - x0})`);

        const link = g
          .append("g")
          .attr("fill", "none")
          .attr("stroke", "#555")
          .attr("stroke-opacity", 0.4)
          .attr("stroke-width", 1.5)
          .selectAll("path")
          .data(root.links())
          .join("path")

          // .attr("stroke", d => highlight(d.source) && highlight(d.target) ? "red" : null)
          // .attr("stroke-opacity", d => highlight(d.source) && highlight(d.target) ? 1 : null)

          .attr("d", treeLink);

        const node = g
          .append("g")
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .selectAll("g")
          .data(root.descendants())
          .join("g")
          .attr("transform", (d) => `translate(${d.y},${d.x})`);

        // node.append("circle")
        //     .attr("fill", d => highlight(d) ? "red" : d.children ? "#555" : "#999")
        //     .attr("r", 2.5);

        // node.append("text")
        //     .attr("fill", d => highlight(d) ? "red" : null)
        //     .attr("dy", "0.31em")
        //     .attr("x", d => d.children ? -6 : 6)
        //     .attr("text-anchor", d => d.children ? "end" : "start")
        //     .text(label)
        //   .clone(true).lower()
        //     .attr("stroke", "white");

        //     d3.select(divRef).append(function(){return svg.node();});

        return svg.node();
      }
    });

    watch(
      () => props.data,(changedValue, initalValue) => {
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

      function dataTransformation(d) {
        if (typeof d == "object")
          return Object.keys(d)
            .filter((d) => d != "$name")
            .map((k) => {
              if (typeof d[k] == "object") d[k].$name = k;
              else d[k] = k + " : " + d[k];
              return d[k];
            });
      }

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
