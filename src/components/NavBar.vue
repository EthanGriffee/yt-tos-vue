<template>
  <div class="navbar navbar-expand-sm">
        <ul class="nav navbar-nav"> 
            <li class="nav-item"> 
                <router-link class="btn btn-sm btn-info text-white mr-4" to="/"> Home </router-link> 
            </li>
            <li class="nav-item">
                <router-link class="btn btn-sm btn-info text-white mr-4" to="/games"> Games </router-link> 
            </li>
            <li class="nav-item">
                <router-link class="btn btn-sm btn-info text-white mr-4" to="/leaderboard"> Leaderboard </router-link> 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
.navbar {
  background-color: #D16002;
}
</style>
