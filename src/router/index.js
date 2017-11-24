import Vue from 'vue'
import Router from 'vue-router'

import FirstPage from '@/components/FirstPage'
import Detail from '@/components/Detail'
import About from '@/components/About'

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
