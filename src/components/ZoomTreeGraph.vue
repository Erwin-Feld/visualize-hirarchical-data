<template>
  <div id="ZoomTreeGraph" ref="divRef"></div>
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

    return { divRef };
  },
};
</script>

<style scoped>
#ZoomTreeGraph {
  height: 100%;
  width: 100%;
}
</style>
