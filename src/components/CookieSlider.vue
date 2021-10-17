<template>
    <div class="cookie-slider">
         <div class="cookie-component">
          We use <router-link to="/policy">policy</router-link> 🍪
          <button>agree</button>
          </div>
    
    </div>
</template>


<style scoped>

.cookie-slider {
   /* grid-area: zoom-tree-graph__cookie-slider-container; */
   /* display: flex;
    align-items: center; */

     
    display: grid; 
  /* grid-template-columns: 0.1fr 0.8fr 1fr; */
  grid-template-rows: 0.4fr 0.6fr 2.2fr 0.2fr;
   /* grid-template-areas: ". . cookie-component";
  height: 60%; */
  width: 100%;
  /* z-index: -1;  */

  /* if accepted use display none !!! */
  /* display: none; */

}


.cookie-component {
  grid-area: cookie-component;
  /* border-radius: var(--main-radius);
  padding-top: var(--main-padding); */
    background: linear-gradient(74deg, rgba(229,229,229,1) 43%, rgba(255,165,0,1) 54%);
    /* z-index: 20; */
}

</style>