import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import frontend from "./views/frontend.vue";
import backend from "./views/backend.vue";
import ios from "./views/ios.vue";
import android from "./views/android.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Frontend",
      name: "Frontend",
      component: frontend
    },
    {
      path: "/Backend",
      name: "Backend",
      component: backend
    },
    {
      path: "/ios",
      name: "ios",
      component: ios
    },
    {
      path: "/android",
      name: "android",
      component: android
    }
  ]
});
