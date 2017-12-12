import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'

import axios from 'axios'
import 'muse-ui/dist/muse-ui.css'
import '../../static/icon.css'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.prototype.$http = axios

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App}
})