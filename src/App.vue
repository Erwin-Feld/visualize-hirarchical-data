<template>
  <div class="container">
    <header>Visualize your nested data structure</header>
    <user-input :parentCompData="graphData" @render-data="receaveData" />

    <div id="graph-container">
      <zoom-tree-graph :data="graphData" />
    </div>
    <footer>
      <div class="footer-container">
        <div class="footer-container__author">© 2021 Erwin Feld</div>
        <div class="footer-container__contact">erwinfeld.dev@gmail.com</div>
      </div>
    </footer>
  </div>
</template>

<script>
import UserInput from "./components/UserInput.vue";
import ZoomTreeGraph from "./components/ZoomTreeGraph.vue";


export default {
  name: "App",
  components: {
    UserInput,
    ZoomTreeGraph,
  },

  data() {
    return {
      graphData: {
        cereal: "no",
        bread: [
          { toast: "nah" },
          {
            
            sandwich: [
             "bacon", "pepperoni ", "cheese"
            ],
            cornbread: "nope",
          },
        ],
      },
    };
  },

  methods: {
    receaveData(compTransmit) {
      // get the userdata from input Component and sends it to graph to render
      this.graphData = compTransmit;
    },
  },
};
</script>

<style>
* {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}

:root {
  --main-radius: 5px;
  --main-padding: 5px;
  padding-left: 5%;
  padding-right: 5%;
}

.container {
  height: 100vh;

  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.4fr 0.6fr 2.2fr 0.2fr;
  grid-template-areas:
    "header header header header"
    "user-input user-input user-input user-input"
    "graph-container graph-container graph-container graph-container"
    "footer footer footer footer";
     text-align: center;
  grid-gap: 0.1rem;
  color: #004d40;
}


@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@1&display=swap");
header {
  margin-top: 5px;
  font-weight: 800;
  text-align: center;
  font-family: "Roboto Mono", monospace;
  color: #004d40;

  grid-area: header;
  border-radius: var(--main-radius);
  padding-top: var(--main-padding);
}

#graph-container {
  grid-area: graph-container;
  border-radius: var(--main-radius);
  padding-top: var(--main-padding);
}

footer {
  background: #916bbf;
  grid-area: footer;
  border-top-left-radius: var(--main-radius);
   border-top-right-radius: var(--main-radius);
  padding-top: var(--main-padding);
}

.footer-container {
 display: flex;
 flex-direction: row;
  align-content: flex-start;
 gap: 5%;
 margin-left: 5%;
 margin-right: 10%;
 
}

.footer-container__author {
  font-size: 0.6rem;
   font-weight: 500;
    /* text-shadow: 1px 2px 2px rgba(171, 171, 177, 0.51); */
     color: rgb(241, 237, 237);

}

.footer-container__contact {
  text-decoration: underline; 
  font-size: 0.6rem;
   font-weight: 500;
      color: rgb(241, 237, 237);
}

/*     
  @media only screen and (max-width: 550px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows:0.2fr 1.2fr 1.8fr 0.3fr;
      grid-template-areas:
        "nav"
        "userInput"
        "treeGraph"
        "footer";
    }
  } */
</style>
