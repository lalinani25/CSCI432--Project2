<script setup>
import { RouterLink } from 'vue-router'
import Logo from './Logo.vue'

console.log("header")
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink
        :to="($route.path !== '/main' && $route.path !== '/profile' 
            && $route.path !== '/search' && $route.path !== '/searchTeams' 
            && $route.path !== '/searchPlayers' && $route.path !== '/searchGames' 
            && $route.path !== '/placeBets' && $route.path !== '/userBets') 
            ? '/' : '/main'"
        class="logo-link"
      >
        <Logo />
      </RouterLink>
      <nav class="nav-slot">
        <slot></slot>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  margin-top: -10px;
  background-color: rgb(0, 0, 0);
  position:fixed
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
}

.logo-link {
  display: flex;
  align-items: center;
}

.nav-slot {
  display: flex;
  align-items: center;
  gap: 25px;
}

:slotted(*) {
  font-size: 14px;
  font-weight: 500;
  color: var(--clr-primary-400);
  text-decoration: none;
}
</style>
