// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

import MuseUI from 'muse-ui'
// import marked from 'marked'
import axios from 'axios'
import 'muse-ui/dist/muse-ui.css'
import '../../static/icon.css'

Vue.config.productionTip = false

Vue.use(MuseUI);
Vue.prototype.$http = axios

// 消除移动端点击延迟
FastClick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
