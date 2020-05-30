<template>
  <div>
    <div>
        <div v-for="game in games" :key="game.id">
          <div class="row ml-4">
            <div @click="goToGame(game.id)">{{game.id}} </div>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'gamelist',
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
            const response = await fetch('http://localhost:8080/api/games')
            const data = await response.json()
            this.games = data
        } catch (error) {
            console.error(error)
        }
    },
    goToGame(id) {
      this.$router.push({name:'gameItem',params:{id:id}})
    }
  }
}
</script>
