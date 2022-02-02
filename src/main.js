import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import VueGtag from 'vue-gtag';
// import { VueCookieNext } from 'vue-cookie-next';

const app = createApp(App);

app.use(router);
// app.use(VueCookieNext);
// app.use(VueGtag, {
//     config: { id: 'G-BG7RMDVJ6R' },
//     router,
//     enabled: false,
//   });



// app.provide('gtag', app.config.globalProperties.$gtag);


app.mount('#app')

