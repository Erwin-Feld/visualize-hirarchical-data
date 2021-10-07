<template>
   <div class="user-input__container-right">
   
        <button @click="changeData">x</button>
         <p>{{errorMessage}}</p>
   </div>
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

<style scoped>

  .user-input__container-right{
     grid-area: user-input__container-right;
        display: flex;
        flex-direction: column;

      font-size: 6px;
      background: white;
   }

</style>