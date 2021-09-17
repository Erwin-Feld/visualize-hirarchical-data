<template>


     
     <input  rows="20" cols="40" v-model="userinput" /> 

    <button type="button" @click="transmitData">transmit</button>
    <p>{{userinput}}</p>

</template>

<script>
export default {

    // https://stackoverflow.com/a/69194446/14809198
    emits: ['transmit-data'],
 
     
data() {
    return {
        userinput: " dd",
        lowlvl: ""
    }
},

methods: {
    transmitData(event){
        this.$emit('transmit-data', this.userinput)
    },

 


}



}
</script>