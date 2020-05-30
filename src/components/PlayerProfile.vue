<template>
  <div>
    <div>
        <div> 
         TO BE FILLED IN LATER
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        player: "",
        name:this.$route.params.name 
    }
  },
  name: 'playerprofile',
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getPlayedGames()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getPlayedGames'
  },
  methods: {
    async getPlayedGames() {
        try {
            const response = await fetch('http://localhost:8080/pi/players/' + this.name)
            const data = await response.json()
            this.player = data
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
