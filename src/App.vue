<template>
   <div class="container">
      <header>hier kommt eine Überschrift</header>
    <user-input @transmit-data="receaveData" />

    <!-- <tree-graph :data="data" /> -->
      <!-- <zoom-tree-graph :data="data" /> -->
      <div id="graph-container">
      <!-- <scaled-svg /> -->
     <zoom-tree-graph :data="data" />
      </div>
<footer>Footer</footer>
 </div>

</template>

<script>
import UserInput from "./components/UserInput.vue";
// import TreeGraph from "./components/TreeGraph.vue"
import ZoomTreeGraph from "./components/ZoomTreeGraph.vue"
import ScaledSvg from "./components/ScaleSvg.vue";
import packageJson from "../package.json";


// import {initialValue}  from '../src/assets/d3/initalValue'
// import { packageJson } from "../src/assets/d3/data";


export default {
  name: "App",
  components: {
    UserInput,
    // ScaledSvg
    ZoomTreeGraph,
  },

  data() {
    return {
     
      data: {
    name: "root",
    children: [
      {name: "child #1"},
      {
        name: "child #2",
        children: [
          {name: "grandchild #1"},
          {name: "grandchild #2"},
          {name: "grandchild #3"}
        ]
      }
    ]
  },

  
      internData: "[1, 2, 3]",
      childData: packageJson
    };
  },

  methods: {

    receaveData(compTransmit){

      console.log(typeof packageJson)
      // get the value of proxy 
      this.data = compTransmit

    

    },

    transformData() {
      //
      //
      this.internData = JSON.parse(this.internData);

     
      //  this.internData.push(12);

     
    },
 
  },
};
</script>

<style>
/* TODO add 
/* add Inter  */
/* https://reactgo.com/add-fonts-vue-app/ */
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

:root {
    --main-radius: 5px;
    --main-padding: 5px;
    padding-left: 5%;
    padding-right: 5%;
  }
  
  /* body {
    font-family: "Inter", sans-serif;
    background: #004d40;
  } */
  

.container {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.2fr 0.6fr 2.2fr 0.2fr;
    grid-template-areas:
      "nav nav nav nav"
      "userInput userInput userInput userInput"
      "graph-container graph-container graph-container graph-container"
      "footer footer footer footer";
    grid-gap: 0.5rem;
    font-weight: 800;
    text-transform: uppercase;
  /* Lab *
  /* makes font size global !!!/ */
    font-size: 12px;
    color: #004d40;
    text-align: center;
  }

  /* TODO header hat komischen Abstand */

  header {
    text-align: center;
    background: #a7ffeb;
    grid-area: nav;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }

  #userInput {
    background: #6fffd2;
    grid-area: userInput;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }
  
  #graph-container {
   
    grid-area: graph-container;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
    
  }
  

  
  footer {
    background: #1de9b6;
    grid-area: footer;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }


/*     
  @media only screen and (max-width: 550px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows:0.2fr 1.2fr 1.8fr 0.3fr;
      grid-template-areas:
        "nav"
        "userInput"
        "treeGraph"
        "footer";
    }
  } */
  
</style>
