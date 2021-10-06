<template>
  <div id="userInput">
    <textarea class="dataInput" cols="50" rows="12" v-model="userinput" />

    <button type="button" @click="transmitData">transmit</button>
  <div>
    <!-- Add  -->
  <!-- this syntax wenn falsch display paragraph inside div  -->
  <!-- else display error inside div which contains paragraph end button on top -->

    <p class="error" v-if="! this.errorContent">achte auf correcte formatierung </p>
      <!-- Add v-bind change class class deletes second p to make error div bigger -->
      <!-- see https://stackoverflow.com/questions/43210508/vue-js-conditional-class-style-binding -->
       <!-- {{this.errorContent}} -->
       <pop-up v-else :errorMessage="this.errorContent" @changeValue="receaveData" />

       
       <!-- Add  change value from chid component -->
       <!-- <button @click="this.errorContent = false">x</button> -->
    </div>

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

        console.log(this.errorContent)

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
  // Experimental--start
  //   context ist für custom events !!!
  // setup(context){

  //     const userinput = ref({key: "value"})

  //        function transmitData(event){

  //         console.log(typeof userinput)
  //     //     https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3
  //     //  
  //         // reactive is used with objects
  //         //  input element changes it to string
  //         // complete change no value
  //         //

  //         //  wie kann man variable mit sich selbst ändern ?
  //         // platzhalter muss bleiben
  //         //  userinput

  //         // const data = {key: "bro"}
  //         // Object.assign(userinput, data)
  //         // userinput = {prop : "dude"}

  //         // // Array wird wohl auch erkannt
  //         // console.log( Array.isArray(convertedObject))

  //         // userinput = convertedObject

  //         context.$emit('transmit-data', userinput)
  //     }

  //     return {
  //         userinput,
  //         transmitData
  //     }
  // }

  // Experemental--finish
};
</script>

<style scoped>

.dataInput {
    font-size: 8px;
}

</style>
