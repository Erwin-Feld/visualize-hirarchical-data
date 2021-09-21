<template>
  <div class="smurck">
    <h1>I have this prop</h1>
    <svg ref="svgRef"></svg>
  </div>
</template>

<script>
import d3 from '@/assets/d3';


import { onMounted, ref, watchEffect } from "@vue/runtime-core";




export default {
  name: "TreeGraph",
  props: ["data"],

  setup(props) {
    const svgRef = ref(null);

    
    onMounted(() => {
      watchEffect(() => {

        console.log(props.data)
        // 
        // TODO // add connection to graph !!!



        // const selectSvg = d3.select(svgRef.value);


        //   selectSvg

        //   .selectAll("g")
        //   .data(props.data)
        //   .join("g")

        //   .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
        //   .append("rect")
        //   .attr("width", 20 + "px")
        //   .attr("height", 20 + "px")
        //   .attr("fill", d3.color("orange"));


      });
    });





    return { svgRef };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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