import Vue from 'vue'
import Router from 'vue-router'

/*
import FirstPage from '../views/FirstPage'
import Detail from '../views/Detail'
import About from '../views/About'
import Collect from '../views/Collect'
*/

const FirstPage = () => import(/* webpackChunkName: "firstpage" */ '../views/FirstPage')
const Detail = () => import(/* webpackChunkName: "detail" */ '../views/Detail')
const About = () => import(/* webpackChunkName: "about" */ '../views/About')
const Collect = () => import(/* webpackChunkName: "collect" */ '../views/Collect')



Vue.use(Router)

export default new Router({
  routes: [
    {  // 首页
      path: '/',
      name: 'FirstPage',
      component: FirstPage
    }, {  // 详情
    	path: '/scp/:numid',
    	name: 'Detail',
    	component: Detail
    }, {  // 关于
      path: '/about',
      name: 'About',
      component: About
    }, { // 收藏
      path: '/collect',
      name: 'Collect',
      component: Collect
    }
  ]
})
  