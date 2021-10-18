<template>
  <div class="cookie-slider">
    <div class="consent-container">
      <p>This website uses cookies. For more information read our</p>
      <router-link to="/policy"> 🍪 policy</router-link>
      <button class="consent-button" type="button">Got it!</button>
    </div>
  </div>
</template>

<style scoped>

.cookie-slider {

  /* visibility animation after 6 seconds */
  animation: showBlock 0s 6s forwards;
  visibility: hidden;

  display: flex;
  flex-direction: column;
  height: 30%;

  /* Add display none if cookie accepted  */
  /* display: none; */
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
  gap: 5px;
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
</style>
