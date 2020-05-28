<template>
  <div>
    <transition-group name="fade" tage="div" 
    enter-active-class="animated fadeInRight"
    leave-active-class="animated fadeOutRight">
    <div>
        <div v-for="player in players" :key="player.username">

        </div>
    </div>
    </transition-group>
    </div>
</template>

<script>
export default {
  name: 'leaderboard',
  props: {
    players: Array
  },
  methods: {
    async getGames() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            this.players = data
        } catch (error) {
            console.error(error)
        }
    }
  }
}
</script>
