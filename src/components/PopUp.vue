<template>
  <div class="user-input__container-right-pop-up">
    <div class="error-message__json5">{{ errorMessage }}</div>

    <div class="error-message__datatypes">accepted data types:</div>

    <div class="error-message__datatypes">arrays -> [1,2,"hello"]</div>

    <div class="error-message__datatypes">objects/dicts -> {prop: "value"}</div>

    <div class="error-message__datatypes">JSON -> {"prop": "value"}</div>

    <div class="error-message__variables">no variables!</div>

    <button type="button" class="pop-up__button" @click="hidePopUp">
      close
    </button>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["errorMessage"],
  emits: ["hide-popUp"],

  methods: {
    hidePopUp() {
      // emits to hide the popUp component by set the parsing error content to false
      // which is the default state
      this.$emit("hide-popUp", false);
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
  align-content: center;

  background: #0c0c0c;
  border-radius: 2%;

  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 10px;
}

.error-message__json5 {
  margin-top: 3px;
  margin-left: 2px;
  margin-right: 2px;
  color: red;

  font-family: "Roboto Mono", monospace;
  font-size: 0.4rem;
  font-weight: 600;
}

.error-message__datatypes {
  margin-top: 1px;
  margin-left: 2px;
  margin-right: 2px;

  font-size: 0.4rem;
  font-weight: 500;
  font-family: "Roboto Mono", monospace;
  color: rgb(241, 237, 237);
}

.error-message__variables {
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 0.5rem;
  font-family: "Roboto Mono", monospace;
  font-weight: 500;
  color: rgb(245, 241, 241);
}

.pop-up__button {
  font-size: 0.7rem;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 5px;




  box-shadow: 0 0 1px #ccc;
  text-shadow: 1px 1px 2px rgba(118, 118, 124, 0.51);
}


/* mobile same */
/* Tablet */
@media only screen and (min-width: 200px) {
  .error-message__json5 {
    font-size: 0.7rem;
  }

  .error-message__datatypes {
    font-size: 0.6rem;
  }

  .error-message__variables {
    font-size: 0.8rem;
  }
}

/* Laptop 1024 */
@media only screen and (min-width: 1024px) {
  .error-message__json5 {
    font-size: 0.8rem;
  }

  .error-message__datatypes {
    font-size: 0.7rem;
  }

  .error-message__variables {
    font-size: 0.9rem;
  }

  .pop-up__button {
     font-size: 0.9rem;
       align-self: center;
       min-width: 200px;
  }
}

/* Desktop 1440 */
@media only screen and (min-width: 1440px) {
  .error-message__json5 {
    margin-top: 10px;
    font-size: 1rem;
  }

  .error-message__datatypes {
    font-size: 1rem;
  }

  .error-message__variables {
    font-size: 1.2rem;
  }

  .pop-up__button {
     font-size: 1.2rem;
       align-self: center;
        min-width: 200px;
  }
}
</style>
