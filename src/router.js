import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'
import Stroie from './components/Storie'
import Home from './components/Home'
import Sections from './components/Sections'
import Topic from './components/Topic'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/index',
    component: Index,
    children: [{
      path: '/home',
      component: Home
    }, {
      path: '/sections',
      component: Sections
    }, {
      path: '/topic/:id/:name',
      name: 'topic',
      component: Topic
    }]
  }, {
    path: '/storie/:id',
    name: 'storie',
    component: Stroie
  }]
})
