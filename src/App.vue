<template>
  <div class="container">
    <header>Visualize your nested data structure</header>
    <user-input :parentData="graphData" @transmit-data="receaveData" />

    <div id="graph-container">
      <zoom-tree-graph :data="graphData" />
    </div>
    <footer>
      <p>interested ? conntect me erwinfeld.dev@gmail.com</p>
    </footer>
  </div>
</template>

<script>
import UserInput from "./components/UserInput.vue";
import ZoomTreeGraph from "./components/ZoomTreeGraph.vue";

// Add delete 

export default {
  name: "App",
  components: {
    UserInput,
    ZoomTreeGraph,
  },

  data() {
    return {
      graphData: {
        prop: "dead branch",
        branch: [
          { prop: "leaf" },
          {
            name: "child #2",
            children: [
              { name: "grandchild #1" },
              { name: "grandchild #2" },
              { name: "grandchild #3" },
            ],
          },
        ],
      },
    };
  },

  methods: {
    receaveData(compTransmit) {
      // get the value of proxy
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
  grid-template-rows: 0.4fr 0.6fr 2.2fr 0.3fr;
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
  border-radius: var(--main-radius);
  padding-top: var(--main-padding);
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
