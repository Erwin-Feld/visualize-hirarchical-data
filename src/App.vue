<template>
<!-- router view  displays dynamically which rout is anvisiert-->
  <router-view/>
</template>

<script>
import Home from "./views/Home.vue";


export default {
  name: "App",
  components: {
    Home,
  },

};
</script>

