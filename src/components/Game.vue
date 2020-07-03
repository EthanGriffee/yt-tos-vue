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
        <iframe :src="youtubeURL" frameborder="0" allowfullscreen></iframe>
      </div>
      </div>
    </div>
</template>

<script>
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
            const response = await fetch(`${process.env.VUE_APP_API_URL}games/${this.gameId}/players`)
            const data = await response.json()
            this.players = data
            this.game = this.players[0].game;
        } catch (error) {
            console.error(error)
        }
    },
    goToPlayers(username) {
      this.$router.push({name:'playerProfile',params:{name:username}})
    }
  },
  computed: {
    // a computed getter
    youtubeURL: function () {
      // `this` points to the vm instance
      return "https://www.youtube.com/embed/" + this.game.youtubeID;
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