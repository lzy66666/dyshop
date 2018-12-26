import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import addGoods from '@/views/addGoods/addGoods'
import classify from '@/views/classify/classify'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          name: 'classify',
          component: classify
        },
        {
          path: '/addGoods',
          name: 'addGoods',
          component: addGoods
        }
      ]
    }

  ]
})
