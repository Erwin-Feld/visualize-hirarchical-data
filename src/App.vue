<template>
  <img alt="half life logo" src="./assets/logo.png" />
    <tree-graph :data="data" />
  <user-input @transmit-data="receaveData" />


  <!-- <button type="button" @click="changeData">click to change</button>
    -->

</template>

<script>
import UserInput from "./components/UserInput.vue";
import TreeGraph from "./components/TreeGraph.vue"



// import {initialValue}  from '../src/assets/d3/initalValue'
// import { packageJson } from "../src/assets/d3/data";


export default {
  name: "App",
  components: {
    UserInput,
    TreeGraph,
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
      childData: " "
    };
  },

  methods: {

    receaveData(compTransmit){
      
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
