<template>
  <div>
    <div>
        <div v-for="game in games" :key="game.id">
          <div class="row ml-4">
            <div @click="goToGame(game.id)">{{game.id}} </div>
            {{game.winner}}
            {{game.mvp.name}}
            {{game.lvp.name}}
          </div>
        </div>
    </div>
    </div>
</template>

<script>
import {CONFIG} from '../config.js'
import goToGameMixin from '../mixins/goToGameMixin'

export default {
  name: 'gamelist',
  mixins: [goToGameMixin],
  props: {
    games: Array
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getAllGames()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getAllGames'
  },
  methods: {
    async getAllGames() {
        try {
            const response = await fetch(`${CONFIG.api}games`)
            const data = await response.json()
            this.games = data
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
