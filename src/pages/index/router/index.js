import Vue from 'vue'
import Router from 'vue-router'

import FirstPage from '../views/FirstPage'
import Detail from '../views/Detail'
import About from '../views/About'

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
