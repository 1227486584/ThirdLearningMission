// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './utils/http.js'
import installCom from './utils/mapComponent'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '../static/css/common.css'
Vue.use(iview)
Vue.prototype.axios = axios
Vue.config.productionTip = false
installCom()
/* eslint-disable no-new */
let _this =new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.vue = _this
