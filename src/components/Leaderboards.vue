<template>
  <div>
    <div>
      <div> 
        <div class="container-1">
          <font-awesome-icon @click="onSearch()" class=search-icon icon="search" style="color:white"/>
          <input v-model="searched" type="search" id="search" placeholder="Name..."/>
        </div>
      </div>
      <table class="table table-hover table-sm table-dark">
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
          <th @click="goToPlayer(stat.player.name)"> {{stat.player.name}} </th>
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
import {CONFIG} from '../config.js'

export default {
  data() {
    return {
      last_sorted: "none"
    }
  },
  name: 'leaderboards',
  props: {
    stats: Array, 
    searched: String
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStats(this.$route.query.search)
  },
  watch: {
    // call again the method if the route changes
    '$route' (to) {
      this.getStats(to.params.search)
    }
  },
  methods: {
    async getStats(searching) {
      console.log(searching)
        try {
            let response;
            if (searching) {
              response = await fetch(`${process.env.VUE_APP_API_URL}stats/${searching}`)
            }
            else {
              response = await fetch(`${process.env.VUE_APP_API_URL}stats`)
            }
            const data = await response.json()
            this.stats = data
        } catch (error) {
            console.error(error)
        }
    },
    onSearch() {
      this.$router.push({name:'searchedLeaderboard', params:{search:this.searched}})
    },
    goToPlayer(name) {
      this.$router.push({name:'playerProfile', params:{name:name}})
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

<style scoped>
 .container-1{
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
  float:right;
  margin: 10px 10px 10px 0px;
}
.container-1 input#search{
  width: 300px;
  height: 50px;
  background: #2b303b;
  border: none;
  font-size: 10pt;
  color: #63717f;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.container-1 .search-icon{
  position: absolute;
  margin-left: 5px;
  top: 30%;
  color: #4f5b66;
}

</style>