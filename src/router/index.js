import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import Entrypoint from '@/views/entrypoint'

Vue.use(VueMeta)
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Entrypoint',
    component: Entrypoint
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
