<template>
  <img alt="half life logo" src="./assets/logo.png" />

  <user-input />

  <textarea rows="20" cols="40" v-model="internData" @input="onInputme" />

  <button type="button" @click="transformData">click</button>
   <button type="button" @click="whatFormat">what</button>

  <p>{{ internData }}</p>
</template>

<script>
import UserInput from "./components/UserInput.vue";

export default {
  name: "App",
  components: {
    UserInput,
  },

  data() {
    return {
      data: "dickerson",
      internData: "[1, 2, 3]",
    };
  },

  methods: {
    transformData() {
      //
      //
      this.internData = JSON.parse(this.internData);

     
      //  this.internData.push(12);

     
    },
    whatFormat(){
      console.log( Object.values(this.internData))
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
