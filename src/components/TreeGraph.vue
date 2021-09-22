<template>
  <div class="smurck" >

    <div ref="divRef"></div>

    <h1>I have this prop</h1>
     <!-- <div class="limit" ref="divRef"></div> -->
  </div>
</template>

<script>
import d3 from '@/assets/d3';


import { onMounted, ref, watchEffect } from "@vue/runtime-core";

// import { initialValue } from './initalValue'


export default {
  name: "TreeGraph",
  props: ["data"],

  setup(props) {
    // const divRef = ref(null);
    const divRef = ref(null)
    
    onMounted(() => {

      // TODO 
      // ---> Check if element with class xy exists already if so delete it !!!

      // if div contains class --> remove 
      watchEffect(() => {

        if( d3.selectAll('svg.sex')) {
          console.log(d3.selectAll('svg'))
          console.log("true")
          d3.selectAll('svg.sex').remove()
        }


        // create a function which detects if props value changes second time
        // if it does, it will call the function
        // if it doesn't, it will do nothing
        // this is to prevent the graph from being redrawn every time the props change

        //   const div = divRef.value;
        //   const svg = svgRef.value;
        //   const width = div.clientWidth;
        //   const height = div.clientHeight;


  
          // FIXME 
          // changing data adds a new svg 



const selectDiv = d3.select(divRef.value);



        // selectDiv.classed('selected', true)

        // selectDiv.append("svg").classed('sex', true)

          // .selectAll("g")
          // .data(Object.values(props.data))
          // .join("g")

          // .attr("transform", (d, i) => `translate(60, ${i * 21})`) // use attr instead of style
          // .append("rect")
          // .attr("width", 20 + "px")
          // .attr("height", 20 + "px")
          // .attr("fill", d3.color("orange"));


          
      });
    });
// FIXME das ganze wird 2mal ausgeführt !!!


// ******************************************************************
      //   const selectDivRef = d3.select(divRef.value);
      //  const dx = 12;
      //   const dy = 120;
      //   const treeLayout = d3.tree().nodeSize([dx, dy]);
      //   // TEST
      //     const fam = d3.hierarchy(props.data);

      //   const funcReturn = graph(fam);
      //   d3.select(selectDivRef.node()).append(function() {
      //     return funcReturn;
      //   });
   // ******************************************************************    

        

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

  


      return { divRef } ;

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