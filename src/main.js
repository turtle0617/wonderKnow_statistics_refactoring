import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import VCharts from "v-charts";
import { VueMasonryPlugin } from "vue-masonry";

Vue.use(VCharts);
Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
