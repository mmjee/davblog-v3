import Vue from 'vue'
import VueRouter from 'vue-router'

import Entrypoint from '@/views/entrypoint'

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
