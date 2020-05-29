<template>
  <div>
    <div>
      <table class="table table-hover table-sm">
            <thead>
                <tr>
                <th> Username</th> 
                <th> Games Played</th> 
                <th> Games Won</th>
                <th> Games Lost</th> 
                <th> Draws </th>
                <th> Winrate </th>
                <th> Mvps </th>
                <th> Lvps </th>
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
    }
  }
}
</script>