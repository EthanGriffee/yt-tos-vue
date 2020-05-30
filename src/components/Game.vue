<template>
  <div>
    <div>
        <div> 
          {{gameId}}
          {{game}}
        </div>
        <div class=row v-for="played in players" :key="played.username">
          {{played.player.name}}
          {{played.role}}
        </div>
    </div>
    </div>
</template>

<script>
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
            const response = await fetch('http://localhost:8080/api/games/' + this.gameId + "/players")
            const data = await response.json()
            this.players = data
            this.game = this.players.get(0).game;
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
