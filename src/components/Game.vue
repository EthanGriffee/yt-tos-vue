<template>
  <div>
    <div>
        <div> 
          {{gameId}}
          {{game}}
        </div>
        <ul class=unstyled v-for="played in players" :key="played.username">
          <li v-bind:style="colorOfBox(played.role)">
          {{played.player.name}}
          {{played.role.name}}
          </li>
        </ul>
    </div>
    </div>
</template>

<script>
import {CONFIG} from '../config.js'

export default {
  data() {
    return {
        gameId:this.$route.params.id 
    }
  },
  name: 'game',
  props: {
    game: Object,
    players: Array
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getGames()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getGames'
  },
  methods: {
    async getGames() {
        try {
            const response = await fetch(`${CONFIG.api}games/${this.gameId}/players`)
            const data = await response.json()
            this.players = data
            this.game = this.players.get(0).game;
        } catch (error) {
            console.error(error)
        }
    },
    colorOfBox(role) {
      switch(role.type) {
        case 'JAILOR':
          /* falls through */
        case 'TOWN_INVESTIGATIVE':
          /* falls through */
        case 'TOWN_KILLING':
          /* falls through */
        case 'TOWN_PROTECTIVE':
          /* falls through */
        case 'TOWN_SUPPORT':
          /* falls through */
          return {color: '#23de46'}
        case 'GODFATHER':
          /* falls through */
        case 'MAFIOSO':
          /* falls through */
        case 'RANDOM_MAFIA':
          /* falls through */
          return {color: '#ff1f1f'} 
        case 'NEUTRAL_EVIL':
          switch(role.name) {
            case 'Jester':
              return {color: '#ff91e0'}
            case 'Witch':
              return {color: '#b240ff'}
            case 'Executioner':
              return {color: '#e3e3e3'}
          }
          break;
        case 'NEUTRAL_KILLING':
          switch(role.name) {
            case 'Arsonist':
              return {color: '#ff9a36'}
            case 'Werewolf':
              return {color: '#99773d'}
            case 'Serial Killer':
              return {color: '#263cff'}
          }
          break;
      }
      return {color: 'black'}
    }
  }
}
</script>
