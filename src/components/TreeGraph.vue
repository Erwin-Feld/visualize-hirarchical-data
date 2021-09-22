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

// import { initialValue } from './initalValue'

export default {
  name: "TreeGraph",
  props: ["data"],

  setup(props) {
    // const divRef = ref(null);
    const divRef = ref(null);

    onMounted(() => {
       const selectDiv = d3.select(divRef.value);

        selectDiv

          .selectAll("svg")
          .data(Object.values(props.data))
          .join("svg")
          .classed("sex", true)

          // .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
          // .append("rect")
          // .attr("width", 20 + "px")
          // .attr("height", 20 + "px")
          // .attr("fill", d3.color("orange"));
    console.log("finished")

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
