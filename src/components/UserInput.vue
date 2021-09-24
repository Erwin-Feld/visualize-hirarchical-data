<template>
    <div id="userInput">


     <textarea  rows="20" cols="40" v-model="userinput" /> 

    <button type="button" @click="transmitData">transmit</button>
    </div>

</template>

<script>

// import { ref } from "@vue/runtime-core";


import {parse} from 'json5'

export default {

    // https://stackoverflow.com/a/69194446/14809198
    emits: ['transmit-data'],
 


    //  WORKS !!!
data() {
    return {
        userinput: {},
      
    }
},

methods: {
    transmitData(event){
        // let convertedObject = parse(this.userinput)
        // 

        // makes something different ? 
        this.userinput = parse(this.userinput)
        // 


// 
        // Experimental
        // reasign an Object is different 
       
        this.$emit('transmit-data', this.userinput)
    },
      
}


// Experimental--start 
//   context ist für custom events !!!
// setup(context){

//     const userinput = ref({key: "value"})


//        function transmitData(event){

       
//         console.log(typeof userinput)
//     //     https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3
//     //    OPEN
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


}
</script>