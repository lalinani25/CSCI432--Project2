<script setup>
import { ref, useTemplateRef } from 'vue';
import Player from '@/components/Player.vue';
import Modal from '@/components/Modal.vue';

const searchQuery = ref('');  
const players = ref([]);
const selectedPlayer = ref(null); 
const selectedPlayerData = ref(null); 
const isLoading = ref(false);
const errorMessage = ref('');

const modal = useTemplateRef('name-modal');


let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players';  

const fetchPlayers = async () => {
  let searchUrl = url; 
  
    searchUrl += `?name-search=${searchQuery.value}`; 



  errorMessage.value = '';
  try {
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      players.value = data.data;
      console.log(players.value);
    } else {
      errorMessage.value = 'Failed to fetch players';
    }
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    isLoading.value = false;
  }
};

const getPlayersDetails = async (playerId) => {
  const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players/${playerId}`;
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await fetch(url1, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      selectedPlayer.value = data.player.data; 
      selectedPlayerData.value = data.stats.data[0];  
      modal.value.open(); 
    } else if (response.status === 404) {
      errorMessage.value = 'Player not found';
    }
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center align-center">
    <div class="search-engine">
      <h1>Players</h1>

      <div class="search-container">
        <div class="search-input-container">
          <input class="search-input"
          v-model="searchQuery" 
          placeholder="Search players by name" 
        />
        <button @click="fetchPlayers">Search</button>

      </div>

    </div>
      <div id="s-container" class="s-container">
        <Player
          v-for="player in players" 
          :key="player.id" 
          :name="player.first_name"
          :lname="player.last_name"
          :team="player.team.name"
          @click="getPlayersDetails(player.id)"  
        />
      </div>

      <Modal ref="name-modal">
        <template #header>
          <h2 class="primary-heading">Player Details</h2>
        </template>

        <template #main>
          <div id="modal-main-content">
            <fieldset id="profile-fieldset">
              <legend>Name</legend>
              <p>{{ selectedPlayer?.first_name }} {{ selectedPlayer?.last_name }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Team</legend>
              <p>{{ selectedPlayer?.team.name }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Draft Year</legend>
              <p>{{ selectedPlayer?.draft_year }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Position</legend>
              <p>{{ selectedPlayer?.position }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Jersey Number</legend>
              <p>{{ selectedPlayer?.jersey_number }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Height</legend>
              <p>{{ selectedPlayer?.height }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Games Played</legend>
              <p>{{ selectedPlayerData?.games_played }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Points</legend>
              <p>{{ selectedPlayerData?.pts }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Season</legend>
              <p>{{ selectedPlayerData?.season }}</p>
            </fieldset>
          </div>
        </template>

        <template #footer>
        </template>
      </Modal>

      <div v-if="errorMessage">
        <p style="color: red;">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-engine {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100vh; 
  text-align: center;
  background-color: var(--clr-primary-400);
  padding: 20px;
  border-radius: 40px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-top: 10px;
  margin-left: 90px;
}

.search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Space between input and button */
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
}

input {
  padding: 10px;
  flex-grow: 1; /* Allow the input field to grow */
  min-width: 200px;
  max-width: 400px; 
}
.search-input{
  background-color: var(--clr-primary-400);
  border-radius: 40px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
  color: var(--clr-neutral-100s);
}


button {
  padding: 10px 20px;
  background-color: var(--clr-accent-400);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

button:hover {
  background-color: var(--clr-accent-300);
}

button:active {
  background-color: var(--clr-accent-300);
}

.radio-buttons {
  display: flex;
  justify-content: center;
  color: var(--clr-accent-300);
  gap: 15px;
  margin-top: 10px;
}

label {
  font-size: 14px;
}

.s-container {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
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

p {
  font-size: 16px;
}
#modal-main-content {
  max-height: 400px;  
  overflow-y: auto;   
  padding-right: 5px; 
}
</style>
