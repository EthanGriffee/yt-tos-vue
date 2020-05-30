<template>
  <div>
    <div>
      <table class="table table-hover table-sm">
            <thead>
                <tr>
                <th @click="sortByUsername()"> Username</th> 
                <th @click="sortByGamesPlayed()"> Games Played</th> 
                <th @click="sortByGamesWon()"> Games Won</th>
                <th @click="sortByGamesLost()"> Games Lost</th> 
                <th @click="sortByDraws()"> Draws </th>
                <th @click="sortByWinrate()"> Winrate </th>
                <th @click="sortByMvps()"> Mvps </th>
                <th @click="sortByLvps()"> Lvps </th>
                </tr>
            </thead>
        <tbody v-for="stat in stats" :key="stat.player.name">
          <th> {{stat.player.name}} </th>
          <th> {{stat.games_played}} </th>
          <th> {{stat.games_won}} </th>
          <th> {{stat.games_lost}} </th>
          <th> {{stat.games_drawn}} </th>
          <th>  {{stat.games_won / stat.games_lost}} </th>
          <th> {{stat.mvps}} </th>
          <th> {{stat.lvps}} </th>
        </tbody>
        </table>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      last_sorted: "none"
    }
  },
  name: 'leaderboards',
  props: {
    stats: Array
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getAllStats()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getAllStats'
  },
  methods: {
    async getAllStats() {
        try {
            const response = await fetch('http://localhost:8080/api/stats')
            const data = await response.json()
            this.stats = data
        } catch (error) {
            console.error(error)
        }
    },
    sortHelp(name) {
      let comp, comp2
      if (this.last_sorted == name) { 
        comp = 1
        this.last_sorted = "none"
      } 
      else {
        this.last_sorted = name
        comp = -1
      }
      comp2 = comp * -1
      return [comp, comp2]
    },

    sortByUsername() {
      let comp = this.sortHelp("name")
      this.stats.sort((a, b) => a.player.name > b.player.name ? comp[1] : comp[0]);
    },
    sortByGamesPlayed() {
      let comp = this.sortHelp("games_played")
      this.stats.sort((a, b) => a.games_played > b.games_played ? comp[0] : comp[1]);
    },
    sortByGamesWon() {
      let comp = this.sortHelp("games_won")
      this.stats.sort((a, b) => a.games_won > b.games_won ? comp[0] : comp[1]);
    },
    sortByGamesLost() {
      let comp = this.sortHelp("games_lost")
      this.stats.sort((a, b) => a.games_lost > b.games_lost ? comp[0] : comp[1]);
    },
    sortByDraws() {
      let comp = this.sortHelp("games_drawn")
      this.stats.sort((a, b) => a.games_drawn > b.games_drawn ? comp[0] : comp[1]);
    },
    sortByWinrate() {
      let comp = this.sortHelp("winrate")
      this.stats.sort((a, b) => a.games_won / a.games_lost > b.games_won / b.games_lost ? comp[0] : comp[1]);
    },
    sortByMvps() {
      let comp = this.sortHelp("mvps")
      this.stats.sort((a, b) => a.mvps > b.mvps ? comp[0] : comp[1]);
    },
    sortByLvps() {
      let comp = this.sortHelp("lvps")
      this.stats.sort((a, b) => a.lvps > b.lvps ? comp[0] : comp[1]);
    }
  }
}
</script>