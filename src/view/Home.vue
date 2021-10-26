<template>
  <div class="main-container">
    <header>
      <h1>Visualize your nested data structure</h1>
    </header>
    <user-input :parentCompData="graphData" @render-data="receaveData" />

    <div class="cookie-slider__tree-graph-container">
      <zoom-tree-graph :data="graphData" />

      <cookie-slider />
    </div>
    <footer>
      <div class="footer-container">
        <div class="footer-container__policy">
          <router-link to="/policy">policy</router-link>
        </div>

        <div class="footer-container__contact">erwinfeld.dev@gmail.com</div>
        <div class="footer-container__author">© 2021 Erwin Feld</div>
      </div>
    </footer>
  </div>
</template>

<script>
import UserInput from "../components/UserInput.vue";
import ZoomTreeGraph from "../components/ZoomTreeGraph.vue";
import CookieSlider from "../components/CookieSlider.vue";

export default {
  name: "Home",
  components: {
    UserInput,
    ZoomTreeGraph,
    CookieSlider,
  },

  data() {
    return {
      graphData: {
        cereal: "no",
        bread: [
          { toast: "nah" },
          {
            sandwich: ["bacon", "pepperoni ", "cheese"],
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

:root {
  /* Add change change main radius */
  /* das obere macht alles rund und grenzen */
  --main-radius: 5px;
  --main-padding: 5px;
  /* padding-top: 2%; */
  padding-left: 7%;
  padding-right: 7%;
}

.main-container {
  height: 100vh;

  /* margin-left: auto;
  margin-right: auto; */
  margin: auto;

  display: grid;
  min-width: 200px;
  /* grid-template-columns: 1fr; */
  /* grid-template-rows: 0.4fr 0.6fr 2.2fr 0.2fr; */
  grid-template-areas:
    "header"
    "user-input"
    "cookie-slider__tree-graph-container"
    "footer";
  text-align: center;
  /* Add grid or row gap ? */
  grid-gap: 0.1rem;
  color: #004d40;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@1&display=swap");
header {
  /* margin-top: 1.5rem; */
  font-weight: 800;
  text-align: center;
  font-family: "Roboto Mono", monospace;
  color: #004d40;

  grid-area: header;
  border-radius: var(--main-radius);
  padding-top: var(--main-padding);
}

.cookie-slider__tree-graph-container {
  grid-area: cookie-slider__tree-graph-container;

  display: flex;
  flex-direction: column;

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
  /* font-size: 0.6rem; */
  font-weight: 500;
  color: #ffffff;
}

.footer-container__contact {
  /* font-size: 0.6rem; */
  font-weight: 500;
  color: #ffffff;
}

.footer-container__policy {
  /* font-size: 0.6rem; */
  font-weight: 500;
  color: #ffffff;
}

.footer-container__policy a {
  color: #ffffff;
}

.footer-container__policy a:hover {
  color: #f9f9f9;
  text-shadow: 1px 2px 2.5px rgba(0, 0, 7, 0.904);
}

/* mobile */
@media only screen and (min-width: 200px) {
  .main-container {
    grid-template-rows: 0.2fr 0.5fr 0.8fr 0.2fr;
  }

  h1 {
    margin-top: 1.5rem;
    font-size: 1.3em;
  }

  .footer-container {
    font-size: 1em;
    flex-direction: column;
  }
}

/* Tablet */
@media only screen and (min-width: 768px) {
  .main-container {
    grid-template-rows: 0.3fr 0.8fr 2fr 0.2fr;
  }

  h1 {
    margin-top: 1.5rem;
    font-size: 1.7em;
  }

  .footer-container {
    flex-direction: row;
  }
}

/* Laptop 1024 */
@media only screen and (min-width: 1024px) {
  .main-container {
    grid-template-rows: 0.3fr 1fr 2.2fr 0.2fr;
    grid-gap: 5px;
  }

  h1 {
    margin-top: 1.5rem;
    font-size: 2em;
  }
  .footer-container {
    flex-direction: row;
  }

    .footer-container {
     font-size: 1.2em;
    flex-direction: row;
  }
}


/* Desktop  1400 */
@media only screen and (min-width: 1400px){
  .main-container {
   grid-template-rows: 0.2fr 1fr 2fr 0.2fr;
    grid-gap: 5px;
  }


  header {
     margin-bottom: 10px;
  }

  h1 {
    font-size: 2.5em;
  }
  .footer-container {
     font-size: 1.6em;
    flex-direction: row;
  }
}

</style>
