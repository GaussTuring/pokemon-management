import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

import 'normalize.css/normalize.css'

// import './styles/variables.scss'

// import anime from 'animejs'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import './styles/index.scss'

Vue.use(Element)

// Vue.prototype.$message 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
