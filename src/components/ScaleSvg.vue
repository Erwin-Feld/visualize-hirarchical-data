<template>
  <div id="svg-container" ref="divRef"></div>
</template>

<script>
import d3 from "@/assets/d3";
import makeDataHirarchic from "../assets/d3/graphFunctions";

import { onMounted, ref } from "@vue/runtime-core";

export default {
  name: "ScaleSvg",

  setup() {
    const divRef = ref(null);

    onMounted(() => {
      //  const selectDivRef = d3.select(divRef.value);

      // selectDivRef
      var svg = d3
        .select(divRef.value)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("viewBox", "0 0 300 300")
        // .classed("svg-content", true);

     svg
      .selectAll("g")
          .data([1,2,3])
          .join("g")

          .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
          .append("rect")
          .attr("width", 20 + "px")
          .attr("height", 20 + "px")
          .attr("fill", d3.color("orange"));

    });

    
return {divRef}

  },
};
</script>

<style scoped>
#svg-container {
  height: 100%;
    width: 100%;
    background: bisque;
  /* display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: top;
  overflow: hidden; */
}

.svg-content {
   background: #da563c;
   width: 100%;
   height: 100%;
}
</style>
