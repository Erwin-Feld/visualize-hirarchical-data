<template>
  <div class="zoom-tree-graph" ref="divRef">
    <div class="button-container-left">
      <div class="button-container__input-position">
        <button class="input-position-button" 
        type="button" 
        @click="sendChange">
          {{ inputCompVis ? "hide Input" : "show Input" }}
        </button>
      </div>

      <div class="button-container__graph-position">
        <button
          class="graph-position-button"
          type="button"
          @click="defaultGraphPosition"
        >
          restore Graph
        </button>
      </div>
    </div>
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
  props: ["graphData"],
  emits: ["click-emit"],

  setup(props, { emit }) {
    const divRef = ref(null);

    // visibility of Input Component default is true
    const inputCompVis = ref(true);

    onMounted(() => {
      // *** variables **********************
      const selectDivRef = d3.select(divRef.value);

      const root = customHierarchy(d3, props.graphData, makeDataHirarchic);

      // selects the div parent and append the svg element to it
      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph(d3, root, divRef, window.innerWidth);
      });
    });

    watch(
      () => props.graphData,
      (changedValue, initalValue) => {
        d3.selectAll(".svg-graph").remove();

        // *** creates new one
        // *** variables **********************

        const selectDivRef = d3.select(divRef.value);

        const root = customHierarchy(d3, props.graphData, makeDataHirarchic);

        // selects the div parent and append the svg element to it
        d3.select(selectDivRef.node()).append(function() {
          return zoomGraph(d3, root, divRef, window.innerWidth);
        });
      }
    );

    const defaultGraphPosition = () => {
      d3.selectAll(".svg-graph").remove();

      // *** creates new one
      // *** variables **********************

      const selectDivRef = d3.select(divRef.value);

      const root = customHierarchy(d3, props.graphData, makeDataHirarchic);

      // selects the div parent and append the svg element to it
      d3.select(selectDivRef.node()).append(function() {
        return zoomGraph(d3, root, divRef, window.innerWidth);
      });
    };

    // siehe https://www.youtube.com/watch?v=EEeaG0BTBQo
    const sendChange = (event) => {
      // with button click changes visibility of imputComponent
      // logic located here--> safe vieport space not add extra comp
      emit("click-emit", inputCompVis);
      if (inputCompVis.value === false) {
        inputCompVis.value = true;
      } else {
        inputCompVis.value = false;
      }
    };

    return { divRef, inputCompVis, defaultGraphPosition, sendChange };
  },
};
</script>

<style scoped>

.zoom-tree-graph {
  height: 100%;
  width: 100%;
 
  display: flex;
  flex-direction: row;
}


.button-container-left {
  display: flex;
  flex-direction: column;
}

.button-container__input-position {
    margin-top: 10px;
   margin-bottom: 100px;
}

.input-position-button {
  max-width: 80px;
  border-color: #6FFFD2;
 
  border-radius: 11%;
  font-family: "Roboto Mono", monospace;
  /* font-size: 0.8rem; */
  
}

.input-position-button:hover {
  border-color: #bdbdc298;

}

.graph-position-button {
  max-width: 80px;
  font-family: "Roboto Mono", monospace;

  border-color:   #e2d3f5;
  /* border-color: #F8B3BB; */
  border-radius: 11%;

  /* font-size: 0.8rem; */
}

.graph-position-button:hover {
  border-color: #F78593;

}



/* mobile same */
@media only screen and (min-width: 200px) {
 .button-container-left button {
    font-size: 0.6rem;
  }

}

/* Tablet same */
@media only screen and (min-width: 700px) {
 .button-container-left button {
    font-size: 0.7rem;
  }

}

/* Laptop 1024 */
@media only screen and (min-width: 1024px) {
 .button-container-left button {
    font-size: 0.8rem;
  }
}

/* Desktop 1440 */
@media only screen and (min-width: 1440px) {
  .button-container-left button {
    font-size: 0.8rem;
  }


}

</style>
