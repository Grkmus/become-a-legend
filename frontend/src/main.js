import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue() // add this line of code

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// main.js
