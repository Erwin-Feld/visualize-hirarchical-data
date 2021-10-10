<template>
  <div class="user-input">
    <div class="user-input__container-left">
         <p class="container-left__text-left">insert your data structure
            [arrays],{objects/dicts}
           or JSON
         </p>
          <svg 
          viewBox="-2800 600 5200 2200"  xml:space="preserve">
          <!-- Add add style ? also color -->
         <!-- .st0{fill:#050400;}  -->
      
       <g>
         <g>
        <path class="svg-arrow" d="M110.25,279.65c-10.06,2.42-6.59,33.57-5.38,40.59c30.14,174.8,110,322.79,203.56,455.14
		c98.76,139.75,217.5,257.28,343.51,358.46c135.12,108.49,281.71,194.26,437.76,249.92c75.18,26.82,152.63,44.62,230.32,58.48
		c86.84,15.47,172.88,15.33,260.77,13.65c12.86-0.27,7.29-76.39-10.46-76.05c-75.56,1.48-149.91,2.6-224.88-7.87
		c-80.45-11.26-160.4-30.03-238.35-55.41c-146.78-47.82-285.73-125.7-414.31-222.22c-123.58-92.81-238.92-201.76-339.54-329.41
		c-97.68-123.9-197.24-276.25-227.17-449.83C124.88,308.05,120.62,277.15,110.25,279.65z"/>
	<polygon class="svg-arrow" points="1576.77,1544.63 1569.18,1295.51 1786.35,1430.5 	"/>
         </g>
       </g>
       </svg>

    </div>

    <textarea class="data-insert" cols="50" rows="12" v-model="this.userinput"  :placeholder="this.placeHolder" />

    <!-- change container -->
    <div v-if="!this.errorContent" class="user-input__container-right">
       
         <p class="container-right__text-right"> zoom, drag the graph is you like !</p>
         <button class="display-button" type="button" @click="transmitData">render</button>
          <p v-if="this.emptyFlag" class="container-right__text-empty-reminder"> insert data first!</p>
    </div>
    <pop-up v-else :errorMessage="this.errorContent"  @changeValue="receaveData" />
    

  </div>
</template>

<script>
// import { ref } from "@vue/runtime-core";

import { parse, stringify } from "json5";
import PopUp from './PopUp.vue';

export default {
  components: { PopUp },
  props:['parentData'],
  // https://stackoverflow.com/a/69194446/14809198
  emits: ["transmit-data"],

  //  WORKS !!!
  // FIXME
  // modifed the data here --> there is a re load 
  data() {
    return {
      userinput: "",
      dataTransmit: "",
      placeHolder: JSON.stringify(this.parentData,undefined,4),
      errorContent: "",
      emptyFlag: false,
    
    };
  },

  methods: {

    // receave error message and displays it
    receaveData(receaveValue){
      this.errorContent = receaveValue;
      
    },

    transmitData(event) {
 
      try {
        // if data changed
        // check for empty string 
        // Add check if empty 
        
            if(this.userinput) {
                this.emptyFlag = false;
              
              this.dataTransmit = parse(this.userinput)
              // mit objecten was anderes als mit arrays !!
             //  FIXME wieso wurde das net mehr als array erkant ? 
              // console.log(stringify(this.parentData))

                    // test
              if(stringify(this.dataTransmit) !== stringify(this.parentData)) {
              
                   this.$emit("transmit-data", this.dataTransmit);
     
              }



            } else {
              this.emptyFlag = true;
              this.placeHolder = "";
            }

            

        
       
        
    
    
      // makes something different ?
      } catch(e) {

  //       const x = JSON.stringify(e)
  //       console.log(x)
  //       // Add display error on app
  //       // console.log(e)
  //  console.log(Object.entries(e))
        this.errorContent = e; 
        // console.log(e)

      }
    
  },
  }


};
</script>

<style scoped>

   .user-input {
    background: #6fffd2;

     display: grid;
    grid-template-columns: 1fr 2fr 1fr ;
    grid-template-rows: 0.3fr 0.4fr 1fr 1fr 1fr 0.3fr ;

    grid-gap: 0.5rem;

     grid-template-areas:
     ". . ."
      ". data-insert ."
      "user-input__container-left data-insert user-input__container-right"
      "user-input__container-left data-insert user-input__container-right"
      "user-input__container-left data-insert user-input__container-right"
      ". . .";


    /* component of main layout */
    grid-area: user-input;
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
  }
  
  
   .user-input__container-left{
     grid-area: user-input__container-left;

    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-left: 3px;
    
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
     font-size: 0.6rem;
    text-shadow: 1px 2px 2px rgba(122, 122, 128, 0.51);
   
   }

  .svg-arrow {
    fill: #004d40;

  }

.data-insert {
  grid-area: data-insert;
    font-size: 8px;
    border-radius: 2%;
    
}


textarea:focus::placeholder {
  color: transparent;
}


/* Add change placeholder color font */
/* FIXME   css class gets not changed  */

   .user-input__container-right{
       grid-area: user-input__container-right;
       margin-right: 5px;
     display: flex;
      flex-direction: column;
      gap: 20px;
    font-family: 'Roboto Mono', monospace;
      font-size: 0.5rem;
      align-items: center;
      text-shadow: 1px 2px 2.5px rgba(122, 122, 128, 0.51);
   }


.display-button {
    /* grid-area: component-1__button ; */
    font-size: 1.2em;
    min-width: 50px;
    min-height: 30px;
    max-width: 20%;
    
    max-height: 50%;
    border-radius: 20%;
    box-shadow: 0 4px #A8A8A8;
    /* border-radius: 7%; */
    /* width: 7%;
    height: 5%; */
    font-family: "Inter", sans-serif;
     text-shadow: 1px 2px 2.5px rgba(122, 122, 128, 0.51);
   font-weight: 600;
   background-image: linear-gradient(-270deg, rgba(255,255,255,0.00) 0%, #FFFFFF 20%, #FFFFFF 80%, rgba(255,255,255,0.00) 100%); 



    outline: none;
}

.display-button:active {
   background: #E2B9F7;
  
    box-shadow: 3 4px #666;
    color: #141414;
    font-weight: 1000;
    transform: translateY(7px);

}

.display-button:active.container-right__text-empty-reminder {
    color: #e948f8;

}


.container-right__text-empty-reminder {
   color: #F8485E;
    font-weight: 1000;
}


</style>
