<template>
  <div id=app>
    <div>
    <NavBar> </NavBar>
    <router-view
    @determineWin="determineWin">
    </router-view>
  </div>
    <div id=footer>
      COPYRIGHT 2020
    </div>
  </div>
</template>

<script>

import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color:black;
  position: absolute;
  height: 100%;
  width:  100%;
  color: white;
}

#footer {
  bottom: 0%;
  position: fixed;
  width: 100%
}
</style>
