<template>
  <div class="user-input">
    <!-- left container -->
    <div class="user-input__container-left">
      <p class="container-left__text-left">
        insert your data structure [arrays],{objects/dicts} or JSON
      </p>
      <svg viewBox="-2800 600 5200 2200" xml:space="preserve">
        <g>
          <g>
            <path
              class="svg-arrow"
              d="M110.25,279.65c-10.06,2.42-6.59,33.57-5.38,40.59c30.14,174.8,110,322.79,203.56,455.14
		          c98.76,139.75,217.5,257.28,343.51,358.46c135.12,108.49,281.71,194.26,437.76,249.92c75.18,26.82,152.63,44.62,230.32,58.48
		          c86.84,15.47,172.88,15.33,260.77,13.65c12.86-0.27,7.29-76.39-10.46-76.05c-75.56,1.48-149.91,2.6-224.88-7.87
		          c-80.45-11.26-160.4-30.03-238.35-55.41c-146.78-47.82-285.73-125.7-414.31-222.22c-123.58-92.81-238.92-201.76-339.54-329.41
		          c-97.68-123.9-197.24-276.25-227.17-449.83C124.88,308.05,120.62,277.15,110.25,279.65z"
            />
            <polygon
              class="svg-arrow"
              points="1576.77,1544.63 1569.18,1295.51 1786.35,1430.5"
            />
          </g>
        </g>
      </svg>
    </div>

    <!-- data insert area -->
    <textarea
      class="user-input__data-insert"
      cols="50"
      rows="12"
      v-model="this.userInputData"
      :placeholder="this.placeHolderData"
    />

    <!-- right container -->
    <!-- change container -->
    <div v-if="!this.inputError" class="user-input__container-right">
      <p class="container-right__text-right">
        zoom, drag the graph as you like
      </p>
      <button class="render-button" type="button" @click="sendUserData">
        render
      </button>

      <!-- logic if textarea is empty and button clicked // no data inserted  -->
      <p v-if="this.emptyTextAreaSubmit" class="container-right__text-reminder">
        insert data first!
      </p>
      <!-- if unsuorted Format display paragraph with reminder -->
      <p v-if="this.unsuportedFormat" class="container-right__text-reminder">
        unsuported data format
      </p>
    </div>
    <!-- if syntax error on parsing occurs display the popUp -->
    <pop-up v-else :errorMessage="this.inputError" @hide-popUp="popUpEmit" />
  </div>
</template>

<script>
import { parse } from "json5";
import PopUp from "./PopUp.vue";

export default {
  components: { PopUp },
  props: ["parentCompData"],

  // emits the userInputData to parent
  emits: ["render-data"],

  data() {
    return {
      userInputData: "", // data which the users enters in the textArea field

      renderData: "", // the userData which is send to App component to pass to graph to render it

      // displays the initial data from App component as placeholder inside textArea
      // undefined, 4 makes it to displayed more prettier
      placeHolderData: JSON.stringify(this.parentCompData, undefined, 4),

      // contains the parsing Error from JSON 5 default is false
      inputError: false,
      // flag which detects if user clicks button without inserting data into TextArea
      emptyTextAreaSubmit: false,
      // flag which detects wrong inserted data format
      unsuportedFormat: false,
    };
  },

  methods: {
    // receaves that popUp is clicked to hide from user
    popUpEmit(popUpEmitValue) {
      // sets that parsing error to false /no parsing error
      // popUp hides
      this.inputError = popUpEmitValue;
    },

    // send input from User data to app-->graph
    sendUserData(event) {
      try {
        // resets unsuported format flag // because user clicks
        if (this.unsuportedFormat) {
          this.unsuportedFormat = false;
        }

        // checks if inputfield is empty or not
        if (this.userInputData) {
          // resets emptyTextArea flag
          this.emptyTextAreaSubmit = false;

          // parses input Data from string to Object and inserts to sending Data variable
          this.renderData = parse(this.userInputData);

          // checks if data is only a object to prevent updating parsing errors
          // strings and numbers can only be updates on same row
          if (typeof this.renderData === "object") {
            //  emits data to app.vue-->displays in --> zoomGraph
            this.$emit("render-data", this.renderData);
          } else {
            //  if unsuorted Format display paragraph with reminder
            this.unsuportedFormat = true;
          }
        } else {
          // else block --> tried to submit empty data
          // which sets data value to true and displays the warning paragraph
          this.emptyTextAreaSubmit = true;
          // for better visibilty that data is empty sets the placeHolderData to empty
          this.placeHolderData = "";
        }
      } catch (e) {
        // error message content
        const errorMessage = e.message;

        // slice JSON5 off
        const slicedErrorMessage = errorMessage.substring(7);

        // e.name === errormessage type
        const fullErrorMessage = e.name + " " + slicedErrorMessage;

        this.inputError = fullErrorMessage;
      }
    },
  },
};
</script>

<style scoped>
.user-input {
  background: #6fffd2;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0.3fr 0.4fr 1fr 1fr 1fr 0.3fr;

  grid-gap: 0.5rem;
  grid-template-areas:
    ". . ."
    ". user-input__data-insert ."
    "user-input__container-left user-input__data-insert user-input__container-right"
    "user-input__container-left user-input__data-insert user-input__container-right"
    "user-input__container-left user-input__data-insert user-input__container-right"
    ". . .";

  /* component of main layout */
  grid-area: user-input;
  border-radius: var(--main-radius);
  padding-top: var(--main-padding);
}

/* user input children */
/* left container */
.user-input__container-left {
  grid-area: user-input__container-left;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 3px;

  font-family: "Roboto Mono", monospace;
  font-weight: 500;
  /* font-size: 0.6rem; */
  text-shadow: 1px 2px 2px rgba(122, 122, 128, 0.51);
}

.svg-arrow {
  fill: #004d40;
}

.user-input__data-insert {
  grid-area: user-input__data-insert;
  font-size: 8px;
  border-radius: 2%;
}

/* remove placeholder if focused */
textarea:focus::placeholder {
  color: transparent;
}

.user-input__container-right {
  grid-area: user-input__container-right;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Roboto Mono", monospace;
  font-size: 0.5rem;
  align-items: center;
  text-shadow: 1px 2px 2.5px rgba(122, 122, 128, 0.51);
}

.render-button {
  /* grid-area: component-1__button ; */

  min-width: 50px;
  min-height: 30px;
  max-width: 20%;

  max-height: 50%;
  border-radius: 10%;
  box-shadow: 0 4px #a8a8a8;

  font-family: "Inter", sans-serif;
  font-size: 1.2em;
  text-shadow: 1px 2px 2.5px rgba(122, 122, 128, 0.51);
  font-weight: 600;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 20%,
    #ffffff 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

.render-button:hover {
  /* font-weight: 700; */
  box-shadow: 0 5px #666;
  background: #ede9f0;
}

.render-button:active {
  background: #e2b9f7;

  box-shadow: 3 4px #666;
  color: #141414;
  font-weight: 800;
  transform: translateY(7px);
}

.container-right__text-reminder {
  color: #f8485e;
  font-weight: 1000;
}

/* mobile */
@media only screen and (min-width: 200px) {
  .user-input__container-left {
    font-size: 0.5rem;
  }

  .user-input__data-insert {
    font-size: 0.4rem;
    border-radius: 2%;
  }

  .user-input__container-right {
    font-size: 0.5rem;
  }

  .render-button {
    min-width: 50px;
    min-height: 25px;

    max-height: 50%;

    font-size: 1.1em;
  }
}

/* Tablet */
@media only screen and (min-width: 768px) {
  .user-input__container-left {
    font-size: 0.8rem;
  }

  .user-input__data-insert {
    font-size: 0.7rem;
    border-radius: 2%;
  }

  .user-input__container-right {
    font-size: 0.8rem;
  }

  .render-button {
    min-width: 70px;
    min-height: 35px;

    max-height: 50%;

    font-size: 1.1em;
  }
}

/* Laptop 1024 */
@media only screen and (min-width: 1024px) {
  .user-input__container-left {
    font-size: 1rem;
  }

  .user-input__data-insert {
    font-size: 0.9rem;
    border-radius: 2%;
  }

  .user-input__container-right {
    font-size: 1rem;
  }

  .render-button {
    min-width: 80px;
    min-height: 35px;

    max-height: 50%;

    font-size: 1.1em;
  }
}

/* Desktop 1440 */
@media only screen and (min-width: 1440px) {
  .user-input__container-left {
    font-size: 1.3rem;
  }

  .user-input__data-insert {
    font-size: 1.3rem;
    border-radius: 2%;
  }

  .user-input__container-right {
    font-size: 1.3rem;
  }

  .render-button {
    min-width: 130px;
    min-height: 50px;

    max-height: 70%;

    font-size: 1.1em;
  }
}
</style>
