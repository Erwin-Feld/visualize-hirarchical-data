<template>
  <div class="zoom-tree-graph" ref="divRef">
    <button type="button" @click="defaultGraphPosition">restore Graph</button>
  </div>
</template>

<script>
import d3 from "@/assets/d3";
import {
  makeDataHirarchic,
  zoomGraph,
  customHierarchy,
} from "../assets/d3/graphFunctions";

import { onMounted, ref, watch } from "@vue/runtime-core";

export default {
  name: "ZoomTreeGraph",
  props: ["data"],

  setup(props) {
    const divRef = ref(null);

    onMounted(() => {
      // *** variables **********************
      const selectDivRef = d3.select(divRef.value);

      const root = customHierarchy(d3, props.data, makeDataHirarchic);
      //  link length
      const dx = 60;

      // link height
      const dy = 80;

      // selects the div parent and append the svg element to it
      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph(d3, root, dx, dy, divRef);
      });
    });

    watch(
      () => props.data,
      (changedValue, initalValue) => {
        d3.selectAll(".svg-graph").remove();

        // *** creates new one
        // *** variables **********************

        const selectDivRef = d3.select(divRef.value);

        const root = customHierarchy(d3, props.data, makeDataHirarchic);

        //  link length
        const dx = 60;

        // link height
        const dy = 80;

        // selects the div parent and append the svg element to it
        d3.select(selectDivRef.node()).append(function() {
          return zoomGraph(d3, root, dx, dy, divRef);
        });
      }
    );


    const defaultGraphPosition = () => {
        d3.selectAll(".svg-graph").remove();

        // *** creates new one
        // *** variables **********************

        const selectDivRef = d3.select(divRef.value);

        const root = customHierarchy(d3, props.data, makeDataHirarchic);

        //  link length
        const dx = 60;

        // link height
        const dy = 80;

        // selects the div parent and append the svg element to it
        d3.select(selectDivRef.node()).append(function() {
          return zoomGraph(d3, root, dx, dy, divRef);
        });

    }

    return { divRef, defaultGraphPosition };
  },
};
</script>

<style scoped>

.zoom-tree-graph {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

}

button {
  max-width: 80px;
   font-family: "Roboto Mono", monospace;
  /* color: #999999; */
  /* border-color: #F8485E;  */

   border-color: #e2d3f5;
    /* border-color: #F8B3BB; */
  border-radius: 11%;

  font-size: 0.5rem;
}

button:hover {
   border-color: #D2B6F5;
  font-weight: 600;
    /* text-shadow: 1px 2px 2.5px  #F8485E; */
    /* border-radius: 18%; */
}


/* Tablet */
@media only screen and (max-width: 768px){

button {
   font-size: 0.8rem;
}

}

</style>
