<template>
  <div class="user-input">

    <div class="user-input__container-left">
         <p class="container-left__text-left">insert your data structure</p>
          <svg 
          viewBox="-2300 600 5200 2200"  xml:space="preserve">
          <!-- Add add style ? also color -->
         <!-- .st0{fill:#050400;}  -->
      
       <g>
         <g>
           <path class="st0" d="M2618.93,1487.27l0-0.98l0.02-2.14l-0.16-0.89c-0.17-1.13-0.56-2.22-0.87-3.33c-0.28-1.03-0.46-2.09-0.86-3.1
             l-0.09-0.35l-0.19-0.33c-0.43-0.99-1.07-1.92-1.6-2.88c-0.58-1.04-1.07-2.1-1.76-3.08l-0.53-0.79l-1.56-1.69l-0.71-0.78
             c-0.77-0.86-1.47-1.75-2.33-2.55l-0.97-0.91l-0.19-0.2c-0.55-0.48-1.22-0.81-1.81-1.26l-0.64-0.47c-0.94-0.7-1.81-1.45-2.83-2.08
             l-1.27-0.79c-0.97-0.57-2.02-0.99-3.03-1.49c-1.06-0.53-2.07-1.1-3.18-1.56l-1.41-0.56c-1.18-0.43-2.39-0.73-3.6-1.09
             c-1.07-0.31-2.08-0.71-3.19-0.96l-1.55-0.33c-1.27-0.27-2.59-0.39-3.87-0.57l-0.76-0.11c-0.81-0.09-1.54-0.31-2.35-0.39
             l-0.68-0.05l-0.31-0.03c-82.5-6.58-156.28-21.85-218.01-44.05c-61.89-22.16-111.77-50.97-151.05-83.47
             c-11.83-9.83-33.53-3.2-51.08,15.13c-17.47,18.26-22.33,41.84-8.23,52.47c51.94,39.58,118.71,73.96,201.41,98.33
             c-86.28,8.18-171.93,7.09-253.94-2.13c-82.02-9.32-160.41-26.66-233.6-50.32c-146.62-47.39-272.56-118.56-377.81-201.77
             c-105.15-83.48-190.54-179.33-254.32-282.85c-63.36-103.52-106.28-215.24-115.51-331.18c-1.28-16.41-27.23-26.61-59.09-22.7
             c-31.77,3.9-57.38,21.97-55.97,40.11c10.15,126.07,56,244.15,122.87,353.59c67.41,109.33,157.24,210.27,268.88,298.94
             c111.82,88.32,246.34,164.88,407.15,216.93c80.27,25.94,167.27,45.31,259.44,55.77c92.14,10.38,189.48,11.67,287.64,2.36
             c-97.64,41.44-209.93,74.04-328.61,95.07c-31.44,5.61-56.41,26.22-53.8,47.17c2.58,20.86,34.07,33.68,68.45,27.36
             c112.29-20.45,219.76-50.52,316.02-88.18c96.42-37.59,181.28-82.5,252.92-130.79l0.26-0.18l0.59-0.39c0.7-0.47,1.23-1.03,1.9-1.53
             l0.62-0.48c1.06-0.81,2.18-1.58,3.14-2.45l1.17-1.08c0.81-0.79,1.44-1.65,2.16-2.48c0.81-0.93,1.67-1.81,2.4-2.78l0.83-1.19
             c0.64-0.96,1.09-1.95,1.63-2.93c0.5-0.93,1.1-1.82,1.51-2.77l0.5-1.3c0.41-1.04,0.6-2.09,0.87-3.13l0.19-0.71
             c0.16-0.66,0.47-1.27,0.58-1.94l0.01-0.25l0.13-1.23C2619.03,1489.42,2618.93,1488.35,2618.93,1487.27z"/>
         </g>
       </g>
       </svg>

    </div>

    <textarea class="data-insert" cols="50" rows="12" v-model="userinput" />

    <!-- change container -->
    <div v-if="!this.errorContent" class="user-input__container-right">
       
         <p class="container-right__text-right">make sure its properly formated zoom it move it as you like !</p>
         <button class="display-button" type="button" @click="transmitData">transmit</button>
          
    </div>
    <pop-up v-else :errorMessage="this.errorContent"  @changeValue="receaveData" />


  </div>
</template>

<script>
// import { ref } from "@vue/runtime-core";

import { parse } from "json5";
import PopUp from './PopUp.vue';

export default {
  components: { PopUp },
  // https://stackoverflow.com/a/69194446/14809198
  emits: ["transmit-data"],

  //  WORKS !!!
  // FIXME
  // modifed the data here --> there is a re load 
  data() {
    return {
      userinput: JSON.stringify({
        prop: "dead branch",
        branch: [
          { prop: "leaf" },
          {
            name: "child #2",
            children: [
              { name: "grandchild #1" },
              { name: "grandchild #2" },
              { name: "grandchild #3" },
            ],
          },
        ],
      }, undefined, 4),
      dataTransmit: "",
      placeHolder: {},
      errorContent: "",
    };
  },

  methods: {

    receaveData(receaveValue){
      this.errorContent = receaveValue;
      
    },

    transmitData(event) {
 
      try {

  
         this.dataTransmit = parse(this.userinput);

        // console.log(Array.isArray(this.dataTransmit))
      this.$emit("transmit-data", this.dataTransmit);
    
      // makes something different ?
      } catch(e) {
        // Add display error on app
        this.errorContent = e; 
        // console.log(e)

      }
    
  },
  }


};
</script>

<style scoped>

   .user-input {
    background: #6fffd2;

     display: grid;
    grid-template-columns: 1fr 2fr 1fr ;
    grid-template-rows: 0.3fr 0.4fr 1fr 1fr 1fr 0.3fr ;

    grid-gap: 0.5rem;

     grid-template-areas:
     ". . ."
      ". data-insert ."
      "user-input__container-left data-insert user-input__container-right"
      "user-input__container-left data-insert user-input__container-right"
      "user-input__container-left data-insert user-input__container-right"
      ". . .";


    /* component of main layout */
    grid-area: user-input;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }
  
  
   .user-input__container-left{
     grid-area: user-input__container-left;

    display: flex;
    flex-direction: column;
    align-items: center; 
     font-size: 8px;
   }

.data-insert {
  grid-area: data-insert;
    font-size: 8px;
}


   .user-input__container-right{
     grid-area: user-input__container-right;
      font-size: 8px;
   }




</style>
