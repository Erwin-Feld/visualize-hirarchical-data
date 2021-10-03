<template>
  <div id="userInput">
    <textarea class="dataInput" cols="50" rows="12" v-model="userinput" />

    <button type="button" @click="transmitData">transmit</button>
  </div>
</template>

<script>
// import { ref } from "@vue/runtime-core";

import { parse } from "json5";

export default {
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
    };
  },

  methods: {
    transmitData(event) {
 
      try {

        console.log(this.userinput)

         this.dataTransmit = parse(this.userinput);

        // console.log(Array.isArray(this.dataTransmit))
      this.$emit("transmit-data", this.dataTransmit);
    
      // makes something different ?
      } catch(e) {
        // Add display error on app 
        console.log(e)

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
