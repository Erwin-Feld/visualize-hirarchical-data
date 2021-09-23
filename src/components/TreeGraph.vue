<template>
  <div class="smurck">
    <div ref="divRef"></div>

    <h1>I have this prop</h1>
    <!-- <div class="limit" ref="divRef"></div> -->
  </div>
</template>

<script>
import d3 from "@/assets/d3";

import { onMounted, ref, watch } from "@vue/runtime-core";
import { hierarchy } from 'd3-hierarchy';

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


      const dx = 120;

        const dy = 120;

        // data 
        const data = d3.hierarchy(props.data)

        const treeLayout = d3.tree().nodeSize([dx, dy]);

        // TEST
        const funcReturn = graph(data);

        d3.select(selectDivRef.node()).append(function() {
          return funcReturn;
        });

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
    .classed("graph", true)
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


    watch(() => props.data, (changedValue, initalValue) => {
      console.log(
       
         initalValue
      );
      d3.selectAll("svg").remove()

    });

    return { divRef };

    // return { divRef };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.limit {
  max-width: 100px;
}
</style>
