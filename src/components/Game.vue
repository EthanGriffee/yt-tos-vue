<template>
  <div class=all>
      <div> GAME DETAILS: </div>
      <div class=row>
      <div class="col-lg-6 col-md-7 col-sm-12">
        <ul v-for="played in players" :key="played.username">
          <li v-bind:style="colorOfBox(played.role)" class=white >
            <div class=row>
              <div class=col-1> 
                <font-awesome-icon v-if="determineWin(played)" icon="trophy" style="color:gold"/>
              </div>
              <div class=col-1> 
                <font-awesome-icon v-if="game.lvp.name == played.player.name" icon="poo" style="color:brown" spin/>
                <font-awesome-icon v-if="game.mvp.name == played.player.name" icon="award" style="color:black"/>
              </div>
              <div class=col-5 @click="goToPlayers(played.player.name)"> {{played.player.name}} </div>
              <div class=col-5> {{played.role.name}} </div>
            </div>
          </li>
        </ul>
      </div>
      <div class= "col-lg-6 col-md-5 col-sm-12"> 
        <iframe :src="game.youtubeURL" frameborder="0" allowfullscreen></iframe>
      </div>
      </div>
    </div>
</template>

<script>
import {CONFIG} from '../config.js'
import determineWinMixin from '../mixins/determineWinMixin'

export default {
  name: 'game',
  data() {
    return {
        gameId:this.$route.params.id 
    }
  },
  mixins: [determineWinMixin],
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
            this.game = this.players[0].game;
        } catch (error) {
            console.error(error)
        }
    },
    goToPlayers(username) {
      this.$router.push({name:'playerProfile',params:{name:username}})
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
          return {backgroundColor: '#23de46'}
        case 'GODFATHER':
          /* falls through */
        case 'MAFIOSO':
          /* falls through */
        case 'RANDOM_MAFIA':
          /* falls through */
          return {backgroundColor: '#ff1f1f'} 
        case 'NEUTRAL_EVIL':
          switch(role.name) {
            case 'Jester':
              return {backgroundColor: '#ff91e0'}
            case 'Witch':
              return {backgroundColor: '#b240ff'}
            case 'Executioner':
              return {backgroundColor: '#e3e3e3'}
          }
          break;
        case 'NEUTRAL_KILLING':
          switch(role.name) {
            case 'Arsonist':
              return {backgroundColor: '#ff9a36'}
            case 'Werewolf':
              return {backgroundColor: '#99773d'}
            case 'Serial Killer':
              return {backgroundColor: '#263cff'}
          }
          break;
      }
      return {backgroundColor: 'black'}
    }
  }
}
</script>

<style scoped>
.all {
    background-image: url(../assets/tos-background.png);
    background-position: center;
    height: 100%;
    width:  100%;
    position: absolute;
}
.white {
    color: #fff;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 0;
}
iframe {
  width:100%; height:100%;
}
</style>