<script setup>

const props = defineProps({ hTeam: String, vTeam: String, season: Number, logo1: String, logo2: String})

</script>

<template>
    <div class="card">
     
       <img :src="logo1" alt="Team Logo" /> <p>VS</p> <img :src="logo2" alt="Team Logo" />

       <div class="game-details">
        <fieldset id="profile-fieldset">
            <legend>Teams</legend>
            <p>{{ hTeam }} VS {{ vTeam }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Season</legend>
            <p>{{ season }}</p>
          </fieldset>
        </div>
    </div>

</template>

<style scoped>

h1{
    font-family: Helvetica;
    font-size: 20px;
}

.card {
  color: var(--clr-neutral-100);
  width: 100%;
  min-height: 200px;
  padding: 30px;
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  background-color: var(--clr-primary-400);
  padding: 20px;
  border-radius: 40px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
  gap: 20px; 
}

.card img {
  max-width: 130px; 
  max-height: 130px; 
}

.game-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#profile-fieldset {
  margin-bottom: 10px;
  padding: 5px;
  background-color: hsl(60, 1%, 17%);
  border-radius: 50px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  min-width: 300px;
}

legend {
  font-weight: 600;
  color: var(--clr-accent-500);
}


</style>