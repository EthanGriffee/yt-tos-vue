<template>
    <div>
        <div v-for="player in players" :key="player.id">

        </div>
    </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
    players: Array
  },
  methods: {
    async getEmployees() {
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
