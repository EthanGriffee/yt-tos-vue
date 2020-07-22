import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game.vue'
import GameList from './components/GameList.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import Leaderboards from './components/Leaderboards.vue'
import PlayerProfile from './components/PlayerProfile.vue'
import BootstrapVue from 'bootstrap-vue'
import RoleStatistics from './components/RoleStatistics.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "bootstrap";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPoo, faTrophy, faAward, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faPoo, faTrophy, faAward, faTimes, faSearch)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path:"*", 
      redirect: { name: 'home' }
    },
    {
      path:"/home",
      name:"home",
      component: Home,
      meta: {
        title: () => {return 'Home - GeneralPeanut'}
      }
    },
    {
      path:"/games/:id",
      name: "gameItem",
      component: Game,
      meta: {
        title: () => {return 'Game - GeneralPeanut'}
      }
    },
    {
      path:"/games",
      component: GameList,
      meta: {
        title: () => {return 'Games - GeneralPeanut'}
      }
    },
    {
      path:"/leaderboard",
      component: Leaderboards,
      meta: {
        title: () => {return 'LeaderBoard - GeneralPeanut'}
      }
    },
    {
      path:"/leaderboard?search=:search",
      component: Leaderboards,
      name: "searchedLeaderboard",
      meta: {
        title: () => {return 'LeaderBoard - GeneralPeanut'}
      }
    },
    {
      path: "/players/:name",
      component: PlayerProfile,
      name: "playerProfile",
      meta: {
        title: () => {return 'Player - GeneralPeanut'}
      }
    },
    {
      path: "/rolestats",
      component: RoleStatistics,
      name: "roles",
      meta: {
        title: () => {return 'Roles - GeneralPeanut'}
      }
    }
  ]
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title(to)
  })
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
