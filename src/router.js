import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Star',
      component: () => import('./views/Star.vue')
    },
    {
      path: '/fork',
      name: 'Fork',
      component: () => import('./views/Fork.vue')
    },
    {
      path: '/history',
      name: 'Recent',
      component: () => import('./views/History.vue')
    },
  ]
})