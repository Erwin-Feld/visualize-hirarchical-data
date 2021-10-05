<template>
    <h1>{{errorMessage}}</h1>
     <button @click="changeData">x</button>
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