<template>
   
     <button @click="changeData">x</button>
      <p>{{errorMessage}}</p>
</template>

<script>
export default {
    name:"PopUp",
    props: ["errorMessage", "dissmiss"],
    emits: ["change-value"],


    methods: {
        changeData(){
            this.$emit("change-value", false)
        }
    }
    
}
</script>