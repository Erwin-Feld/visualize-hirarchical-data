<template>
   <div class="container">
      <header>Visualize nested data structures </header>
    <user-input @transmit-data="receaveData" />

      <div id="graph-container">
   
     <zoom-tree-graph :data="graphData" />
      </div>
<footer>
  <p>interested ? conntect me erwinfeld.dev@gmail.com</p>
</footer>
 </div>

</template>

<script>
import UserInput from "./components/UserInput.vue";
import ZoomTreeGraph from "./components/ZoomTreeGraph.vue"

import packageJson from "../package.json";



export default {
  name: "App",
  components: {
    UserInput,
    // ScaledSvg
    ZoomTreeGraph,
  },

  data() {
    return {
     
      graphData: {
    prop: "dead branch",
    branch: [
      {prop: "leaf"},
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
  
    };
  },

  methods: {

    receaveData(compTransmit){
      // get the value of proxy 
      this.graphData = compTransmit
    },
 
 
  },
};
</script>

<style>

/* Add Inter  */
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
    height: 100vh;

    margin-left: auto;
    margin-right: auto;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.2fr 0.6fr 2.2fr 0.2fr;
    grid-template-areas:
      "nav nav nav nav"
      "user-input user-input user-input user-input"
      "graph-container graph-container graph-container graph-container"
      "footer footer footer footer";
    grid-gap: 0.5rem;
    font-weight: 800;
    text-transform: uppercase;
    /* Add change font size to mange in every component */
  /* makes font size global !!!/ */
    font-size: 12px;
    color: #004d40;
    text-align: center;
  }

  /* Add header hat komischen Abstand */

  header {
    text-align: center;
    background: #a7ffeb;
    grid-area: nav;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }

   /* #user-input {
    background: #6fffd2;
    grid-area: user-input;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  } 
   */
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
