import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game.vue'
import GameList from './components/GameList.vue'
import VueRouter from 'vue-router'
import Leaderboards from './components/Leaderboards.vue'

import "bootstrap";
// import { library } from "@fortawesome/fontawesome-svg-core";

import "bootstrap/dist/css/bootstrap.css";


Vue.use(VueRouter);
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [
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
      path:"/leaderboards",
      component: Leaderboards
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
