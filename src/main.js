import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import App from "./App.vue";

import router from "./router";

import "./assets/scss/app.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
