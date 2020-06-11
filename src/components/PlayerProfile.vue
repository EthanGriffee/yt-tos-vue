<template>
  <div>
    <div>
        <div class=mb-4>
          RECENT GAMES FROM {{playedGames[0].player.name}}
          <ul v-for="played in playedGames" :key="played.username">
            <li class="row justify-content-center">
              <font-awesome-icon v-if="determineWin(played)" icon="trophy" style="color:gold"/>
              <font-awesome-icon v-else icon="times" style="color:red"/>
              <div class="ml-3 mr-2" @click="goToGame(played.game.id)">{{played.game.id}} </div>
              {{played.role.name}}
            </li>
          </ul>
        </div>
    </div>
    </div>
</template>

<script>
import {CONFIG} from '../config.js'
import determineWinMixin from '../mixins/determineWinMixin'
import goToGameMixin from '../mixins/goToGameMixin'

export default {
  data() {
    return {
        playedGames: "",
        name:this.$route.params.name 
    }
  },
  name: 'playerprofile',
  mixins: [determineWinMixin, goToGameMixin],
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getPlayedGames()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getPlayedGames'
  },
  methods: {
    async getPlayedGames() {
        try {
            const response = await fetch(`${CONFIG.api}players/${this.name}/playedgames`)
            const data = await response.json()
            this.playedGames = data
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
