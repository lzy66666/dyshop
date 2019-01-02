// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from '../static/axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueDND from 'awe-dnd'

Vue.prototype.$bus = new Vue()
Vue.use(ElementUI, VueDND)
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
