import Vue from 'vue'
import App from './App'
import router from './router'
import Components from './components/_index'

Vue.config.productionTip = false

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
