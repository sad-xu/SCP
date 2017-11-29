import Vue from 'vue'
import Router from 'vue-router'

import FirstPage from '../modules/index/views/FirstPage'
import Detail from '../modules/index/views/Detail'
import About from '../modules/index/views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage
    }, {
    	path: '/scp/:id',
    	name: 'Detail',
    	component: Detail
    }, {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
