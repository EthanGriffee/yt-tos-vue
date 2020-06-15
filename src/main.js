import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game.vue'
import GameList from './components/GameList.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import Leaderboards from './components/Leaderboards.vue'
import PlayerProfile from './components/PlayerProfile.vue'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPoo, faTrophy, faAward, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faPoo, faTrophy, faAward, faTimes, faSearch)


Vue.component('font-awesome-icon', FontAwesomeIcon)

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
      component: Home
    },
    {
      path:"/games/:id",
      name: "gameItem",
      component: Game
    },
    {
      path:"/games",
      component: GameList
    },
    {
      path:"/leaderboard",
      component: Leaderboards
    },
    {
      path:"/leaderboard?search=:search",
      component: Leaderboards,
      name: "searchedLeaderboard"
    },
    {
      path: "/players/:name",
      component: PlayerProfile,
      name: "playerProfile"
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
