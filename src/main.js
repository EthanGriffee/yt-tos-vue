import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game.vue'
import GameList from './components/GameList.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import Leaderboards from './components/Leaderboards.vue'
import PlayerProfile from './components/PlayerProfile.vue'

import "bootstrap";
// import { library } from "@fortawesome/fontawesome-svg-core";

import "bootstrap/dist/css/bootstrap.css";


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
