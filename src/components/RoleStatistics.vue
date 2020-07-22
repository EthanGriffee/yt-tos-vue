<template>
  <div>
    <div>
      <div> 
        <div class="container-1"> <!----
        Currently doesnt work since change to bootstrap-vue, will be updated once backend is updated to only return a certain amount of stats
        --->
          <font-awesome-icon @click="onSearch()" class=search-icon icon="search" style="color:white"/> 
          <input v-model="searched" type="search" id="search" placeholder="Name..."/>
        </div>
      </div>
      <b-container>
        <b-table small dark selectable striped hover :primary-key="role" :items="stats" :fields="fields">
          <template v-slot:cell(role)="data">
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
      fields: [{key: 'role', label: 'role', sortable: true}, 
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
    this.getRoleStats()
  },
  methods: {
    async getRoleStats() {
        try {
            let response = await fetch(`${process.env.VUE_APP_API_URL}stats-roles`)
            const data = await response.json()
            this.stats = data
        } catch (error) {
            console.error(error)
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