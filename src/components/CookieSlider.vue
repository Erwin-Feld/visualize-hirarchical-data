<template>
  <div class="cookie-slider-on" :class="{slideroff :cookieFilling}">
    <div class="consent-container">
      <p>This website uses cookies. For more information read our</p>
      <router-link to="/policy"> 🍪 policy</router-link>
      <button 
        class="consent-button" 
        type="button"
        @click="cookieAccepted"
       >Got it!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent,inject } from 'vue';
import cookieFunctionality from '../assets/cookieManager/cookieLogic';



export default defineComponent ({
  name: 'CookieSlider',
  setup() {
    // inject the gtag value from main.js --> inserts the google analytics cookie id
    const gtag = inject('gtag');

    const { deployCookie, cookieFilling } = cookieFunctionality(gtag);
    

    // user accepts cookie -> invokes the cookie function to set it to true 
    const cookieAccepted = () => deployCookie();


    return {
      cookieAccepted,
      cookieFilling,  
     
    };
  },
});
</script>

<style scoped>

.cookie-slider-on {

  /* visibility animation after 4 seconds */
  animation: showBlock 0s 4s forwards;
  visibility: hidden;

  display: flex;
  flex-direction: column;
  height: 30%;
  font-family: "Roboto Mono", monospace;
  font-size: 0.5rem;
  font-weight: 500;

}

/* visibility function */
@keyframes showBlock {
  to {
    visibility: visible;
  }
}

.consent-container {
 
  width: 100%;
  background: linear-gradient(
    74deg,
    rgba(250, 248, 248, 1) 24%,
    rgba(241, 241, 241, 1) 35%,
    rgba(250, 248, 248, 1) 65%,
    rgba(255, 255, 255, 1) 78%
  );
  display: flex;
  align-items: baseline;
  /* gap: 5px; */
}

.consent-button {
  border-color: #e2d3f5;
  border-radius: 11%;

  font-family: "Roboto Mono", monospace;
  font-size: 0.5rem;
}

.consent-button:hover {
  font-weight: 600;
}

/* if cookie accepted dont display the element */
.slideroff {
  display: none;
}

/* mobile */
@media only screen and (min-width: 200px){

.consent-container {
  align-items: center;
 gap: 1px;
  font-size: 0.6rem;
}

.consent-button {

  font-size: 0.5rem;
}

}



/* Tablet */
@media only screen and (min-width: 768px){

.consent-container {
  gap: 2px;
  font-size: 0.8rem;
}

.consent-button {

  font-size: 1rem;
}

}



/* Laptop 1024 */
@media only screen and (min-width: 1024px){

.consent-container {
  gap: 12px;
  font-size: 1rem;
}

.consent-button {

  font-size: 1.1rem;
}

}
</style>
