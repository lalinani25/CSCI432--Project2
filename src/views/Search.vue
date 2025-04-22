<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
    console.log("Hello")
</script>

<template>

<div class="flex justify-center align-center">

  <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>

  <h1>SEARCH FOR</h1>
    <div class="button-container">
        <RouterLink to="/searchTeams" class="button">Teams</RouterLink>
        <RouterLink to="/searchPlayers" class="button">Players</RouterLink>
        <RouterLink to="/searchGames" class="button">Games</RouterLink>
    </div>

  </div>
</template>

<style scoped>

h1 {
  font-size: 24px;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  margin-top: 20px; 
}

.button {
  padding: 10px 20px;
  background-color:rgb(176, 137, 232); 
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease; 
}

.button:hover {
  background-color: var(--clr-accent-300); 
}

.button:active {
  background-color: var(--clr-accent-300); 
}

img {
    max-width: 30px;
    max-height: 30px;
}

</style>
