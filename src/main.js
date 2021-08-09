import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import '@/styles/index.scss'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/material-icons'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
