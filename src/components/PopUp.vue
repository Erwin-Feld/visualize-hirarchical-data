<template>
  <div class="user-input__container-right-pop-up">
    <div class="error-message__json5">{{ errorMessage }}</div>

    <div class="error-message__expl">accepted data types:</div>
 
    <div class="error-message__expl">arrays -> [1,2,"hello"]</div>
    
    <div class="error-message__expl">objects/dicts -> {prop: "value"}</div>
    
    <div class="error-message__expl">numbers, strings, JSON</div>
   
    <div class="error-message__expl-buttom" >no variables!</div>
   
    <button class="pop-up__button" @click="changeData">try again</button>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["errorMessage", "dissmiss"],
  emits: ["change-value"],

  mounted() {
    console.log(Object.keys(this.errorMessage)[2]);
  },

  methods: {
    changeData() {
      this.$emit("change-value", false);
    },
  },
};
</script>

<style scoped>
.user-input__container-right-pop-up {
  grid-area: user-input__container-right;
  display: flex;
  flex-direction: column;
   gap: 1px;
   min-width: 150px;
    margin-right: 5px;
     margin-right: 5px;
  align-content: center;

  /* font-size: 0.6rem; */
  background: #0c0c0c;

   border-radius: 2%;
    /* border: 1px solid #90df78; */
    
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 10px;
}

/* .user-input__container-right-pop-up:hover {
   border: 0.5px solid #daee80;
    box-shadow: rgba(117, 58, 58, 0.5) 2px 2px 10px;

} */

.error-message__json5 {
   margin-top: 3px;
  margin-left: 2px;
  margin-right: 2px;
  color: red;

  font-family: 'Roboto Mono', monospace;

   /* text-shadow: 1px 2px 2px rgba(179, 179, 189, 0.51); */
  font-size: 0.4rem;
   font-weight: 600;
}

 .error-message__expl {
  margin-top: 1px;
  margin-left: 2px;
  margin-right: 2px;

  font-size: 0.4rem;
  font-weight: 500;
   font-family: 'Roboto Mono', monospace;
   /* text-shadow: 1px 2px 2px rgba(110, 110, 114, 0.51); */
   color: rgb(241, 237, 237);
}

 .error-message__expl-buttom {
   margin-top: 2px;
   margin-bottom: 2px;
   font-size: 0.5rem;
    font-family: 'Roboto Mono', monospace;
     font-weight: 500;
      /* text-shadow: 1px 2px 2px rgba(110, 110, 114, 0.51); */
       color: rgb(245, 241, 241);
 }

/* .error-message__json5 {

} */

.pop-up__button {
  /* max-width: 70px; */
  font-size: 0.7rem;
  margin-left: 3px;
   margin-right: 3px;
   margin-bottom: 5px;

    box-shadow: 0 0 1px #ccc;

   text-shadow: 1px 1px 2px rgba(118, 118, 124, 0.51);
}

.pop-up__button:hover {
    box-shadow: 0 0 1px rgb(244, 247, 246);
    
}

.break {
  flex-basis: 100%;
  height: 0;
}

</style>
