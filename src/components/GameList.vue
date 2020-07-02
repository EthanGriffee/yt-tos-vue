<template>
  <div>
    <div>
        <div v-for="game in games" :key="game.id">
          <div @click="goToGame(game.id)" class="row ml-4">
            <div class=mr-1> {{game.id}} </div>
            <div class=mr-1> {{game.winner}} </div>
            <div class=mr-1> {{game.mvp.name}} </div>
            <div> {{game.lvp.name}} </div>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
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
            const response = await fetch(`${process.env.VUE_APP_API_URL}games`)
            const data = await response.json()
            this.games = data
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
