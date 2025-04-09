<script setup>

const props = defineProps({ hTeam: String, vTeam: String, season: Number })

</script>

<template>
    <div class="card">
        <h1 class="primary-heading">Game</h1>
    
        <fieldset id="profile-fieldset">
            <legend>Teams</legend>
            <p>{{ hTeam }} VS {{ vTeam }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Season</legend>
            <p>{{ season }}</p>
          </fieldset>

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
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--clr-primary-400);
  padding: 20px;
  border-radius: 40px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
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