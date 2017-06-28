import Vue from 'vue'
import Router from 'vue-router'

import Booth from '../views/Booth.vue'
import PuzzleList from '../views/PuzzleList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: PuzzleList },
    { path: '/booth', component: Booth }
  ]
})
