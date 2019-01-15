import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import Home from './views/Home.vue'
import web from './views/web.vue'
import backend from './views/backend.vue'
import ios from './views/ios.vue'
import android from './views/android.vue'

Vue.use(Router)
// Vue.use(VueAnalytics, { id: 'UA-82750715-6', Router })

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/web',
    name: 'web',
    component: web
  },
  {
    path: '/backend',
    name: 'Backend',
    component: backend
  },
  {
    path: '/ios',
    name: 'ios',
    component: ios
  },
  {
    path: '/android',
    name: 'android',
    component: android
  }
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-82750715-6',
  router
})

export default router
