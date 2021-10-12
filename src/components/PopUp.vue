<template>
  <div class="user-input__container-right-pop-up">
    <div class="error-message__json5">{{ errorMessage }}</div>

    <div class="error-message__expl">accepted data types:</div>

    <div class="error-message__expl">arrays -> [1,2,"hello"]</div>

    <div class="error-message__expl">objects/dicts -> {prop: "value"}</div>

    <div class="error-message__expl">numbers, strings, JSON</div>

    <div class="error-message__expl-buttom">no variables</div>

    <button class="pop-up__button" @click="hidePopUp">try again</button>
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

.error-message__expl {
  margin-top: 1px;
  margin-left: 2px;
  margin-right: 2px;

  font-size: 0.4rem;
  font-weight: 500;
  font-family: "Roboto Mono", monospace;
  color: rgb(241, 237, 237);
}

.error-message__expl-buttom {
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
  margin-bottom: 5px;

  box-shadow: 0 0 1px #ccc;
  text-shadow: 1px 1px 2px rgba(118, 118, 124, 0.51);
}

.pop-up__button:hover {
  font-size: 0.7rem;
  margin-left: 5px;
  margin-right: 5px;

  font-weight: 700;
  box-shadow: 0 0 1px rgba(250, 248, 250, 0.459);

  text-shadow: 1px 1px 2px rgba(159, 159, 207, 0.51);
}
</style>
