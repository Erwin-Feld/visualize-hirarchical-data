<template>
  <div id="ZoomTreeGraph" ref="divRef"></div>
</template>

<script>
import d3 from "@/assets/d3";
import { makeDataHirarchic, zoomGraph } from "../assets/d3/graphFunctions";

import { onMounted, ref, watch, watchEffect } from "@vue/runtime-core";

export default {
  name: "ZoomTreeGraph",
  props: ["data"],

  setup(props) {
    const divRef = ref(null);

    onMounted(() => {

       // *** variables **********************

      const selectDivRef = d3.select(divRef.value);

      const root = d3.hierarchy(props.data, makeDataHirarchic);
     
      //  link length
      const dx = 60;
      // wurde so ermittelt
      // dy =  width / packageJson.children.length;
      // link height
      const dy = 80;

      // selects the div parent and append the svg element to it 
      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph(d3, root, dx, dy, divRef, props.data);
      });

    });

    watch(

      // watches for data 
      // deletes the svg with outdated data
      // creates a new one with the current data
      () => props.data,
      (changedValue, initalValue) => {
        // console.log(initalValue);

         console.log(Array.isArray(changedValue))
        d3.selectAll("svg").remove();

        // *** creates new one 
       // *** variables **********************

      const selectDivRef = d3.select(divRef.value);

      const root = d3.hierarchy(props.data, makeDataHirarchic);
     
      //  link length
      const dx = 60;
      // wurde so ermittelt
      // dy =  width / packageJson.children.length;
      // link height
      const dy = 80;

      // selects the div parent and append the svg element to it 
      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph(d3, root, dx, dy, divRef, props.data);
      });


      
      }
    );

    return { divRef };
  },
};
</script>


<style scoped>
#ZoomTreeGraph {
  height: 100%;
  width: 100%;
}

/* .node-{
  fill: rgb(187, 255, 0);

} */

/* .svg-graph {
   width: 100%;
   height: 100%;
    background: rgb(165, 165, 172);
} */

.limit {
  border-style: solid;
  border-color: black;
  border-width: 3px;
}

/* .node circle {
  fill: #fff;
  stroke: rgb(49, 56, 61);
  stroke-width: 3px;
} */

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
