<template>
  <div>
    <div>
      <div> 
        <div class="container-1">
          <font-awesome-icon @click="onSearch()" class=search-icon icon="search" style="color:white"/>
          <input v-model="searched" type="search" id="search" placeholder="Name..."/>
        </div>
      </div>
      <b-container>
        <b-table small dark selectable striped hover @row-selected="goToPlayer" :primary-key="player" :items="stats" :fields="fields" :sort-compare="sortCompare">
          <template v-slot:cell(player)="data">
            {{data.value.name}}
          </template>
          <template v-slot:cell(winrate)="data">
            {{data.item.games_won / (data.item.games_won + data.item.games_lost)}}
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      last_sorted: "none",
      fields: [{key: 'player', label: 'Username', sortable: true}, 
        {key: 'games_played', sortable: true}, 
        {key: 'games_won', sortable: true}, 
        {key: 'games_lost', sortable: true}, 
        {key: 'games_drawn', sortable: true},
        {key: 'winrate', label: 'Winrate', sortable: true}, 
        {key: 'mvps', sortable: true}, 
        {key: 'lvps', sortable: true}],
      stats: []
    }
  },
  name: 'leaderboards',
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
    goToPlayer(item) {
      this.$router.push({name:'playerProfile', params:{name:item[0].player.name}})
    },
    sortCompare(aRow, bRow, key) {
      var a = aRow[key] // or use Lodash `_.get()`
      var b = bRow[key]
      if (key === "winrate") {
        a = aRow["games_won"] / (aRow["games_won"] + aRow["games_lost"]);
        b = bRow["games_won"] / (bRow["games_won"] + bRow["games_lost"])
      }
      else if (key === 'player') {
        a = a.name;
        b = b.name;
      }
      if (
        (typeof a === 'number' && typeof b === 'number') ||
        (a instanceof Date && b instanceof Date)
      ) {
        // If both compared fields are native numbers or both are native dates
        return a < b ? 1 : a > b ? -1 : 0
      } else {
        // Otherwise stringify the field data and use String.prototype.localeCompare
        return a.localeCompare(b);
      }
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