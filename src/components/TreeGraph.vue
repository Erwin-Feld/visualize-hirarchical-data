<template>
  <div class="smurck">
    <h1>hello im a component</h1>
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
        const selectSvg = d3.select(svgRef.value);

        selectSvg

          .selectAll("g")
          .data(Object.values(props.data))
          .join("g")

          .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
          .append("rect")
          .attr("width", 20 + "px")
          .attr("height", 20 + "px")
          .attr("fill", d3.color("orange"));
      });
    });

    return { svgRef };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>