import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import PhraseWall from '@/components/PhraseWall'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/phrase-wall',
      name: 'PhraseWall',
      component: PhraseWall
    }
  ],
  mode: 'history'
})
