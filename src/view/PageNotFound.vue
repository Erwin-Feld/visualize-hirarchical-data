<template>
  <div class="container">
    <p>It looks like this page does not exist !</p>
    <nav>
      <router-link to="/">return home</router-link>
    </nav>
  </div>
</template>

<style scoped>
* {
  margin: 0;
}

:root {
  --main-radius: 5px;
  --main-padding: 5px;
}

.container {
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 20%;
  padding-bottom: 5%;

  display: flex;
  flex-direction: column;
  align-content: flex-start;
  gap: 1px;

  text-align: start;
  font-family: "Arial", monospace;
}
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
p {
  font-family: "Open Sans", sans-serif;
  text-align: start;
  background: linear-gradient(
    74deg,
    rgba(250, 248, 248, 1) 24%,
    rgba(241, 241, 241, 1) 35%,
    rgba(250, 248, 248, 1) 65%,
    rgba(255, 255, 255, 1) 78%
  );
  font-weight: bold;
}

nav {
  background: linear-gradient(
    74deg,
    rgba(250, 248, 248, 1) 24%,
    rgba(241, 241, 241, 1) 35%,
    rgba(250, 248, 248, 1) 65%,
    rgba(255, 255, 255, 1) 78%
  );
  border-radius: 3%;
}

a {
  color: #916bbf;
  font-family: "Roboto Mono", monospace;
  text-shadow: 1px 1px 2px rgba(193, 193, 231, 0.51);
  font-size: 1rem;
  margin-left: 20px;
  width: 30%;
  font-weight: 500;
}

nav :hover {
  font-weight: 700;
}
</style>
