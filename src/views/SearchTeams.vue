<script setup>
import { ref, useTemplateRef} from 'vue';
import Teams from '@/components/Teams.vue';
import Modal from '@/components/Modal.vue';

const searchQuery = ref('');  
const teams = ref([]);
const selectedTeam = ref(null); 
const isLoading = ref(false);
const errorMessage = ref('');
const selectedField = ref('');  
const selectedTeamData = ref(null)

const modal = useTemplateRef('name-modal');

let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/teams';  

const fetchTeams = async () => {
  let searchUrl = url; 
  
  if (selectedField.value === 'teamName' && searchQuery.value) {
    searchUrl += `?team-search=${searchQuery.value}`; 
  }

  if (selectedField.value === 'conference' && searchQuery.value) {
    searchUrl += `?conference=${searchQuery.value}`; 
  }

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
      teams.value = data.data;
    } else {
      errorMessage.value = 'Failed to fetch teams';
    }
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    isLoading.value = false;
  }
};

const getTeamDetails = async (teamId) => {
  const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/teams/${teamId}`;
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
      selectedTeam.value = data.standings; 
      selectedTeamData.value = data.team
      console.log(selectedTeam.value)
      modal.value.open()
      console.log(modal.value.open())
    } else if (response.status === 404) {
      errorMessage.value = 'Team not found';
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
      <h1>TEAMS</h1>

      <div class="search-container">
        <div class="search-input-container">
          <input class="search-input"
            v-model="searchQuery" 
            placeholder="Search teams by name or conference" 
          />
          <button @click="fetchTeams">Search</button>
        </div>

        <div class="radio-buttons">
          <label>
            <input type="radio" v-model="selectedField" value="teamName" /> Team Name
          </label>
          <label>
            <input type="radio" v-model="selectedField" value="conference" /> Conference
          </label>
        </div>
      </div>

      <div id="s-container" class="s-container">
        <Teams
          v-for="team in teams" 
          :key="team.id" 
          :name="team.name"
          :conference="team.conference"
          @click="getTeamDetails(team.id)"  
        />
      </div>

      <Modal ref="name-modal">
        <template #header>
          <h2 class="primary-heading">Team Details</h2>
        </template>

        <template #main>
          <fieldset id="profile-fieldset">
            <legend>Name</legend>
            <p>{{ selectedTeamData?.name }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Conference</legend>
            <p>{{ selectedTeamData?.conference }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Season</legend>
            <p>{{ selectedTeam?.season }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Conference Rank</legend>
            <p>{{ selectedTeam?.conference_rank }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Wins</legend>
            <p>{{ selectedTeam?.wins }}</p>
          </fieldset>

          <fieldset id="profile-fieldset">
            <legend>Losses</legend>
            <p>{{ selectedTeam?.losses }}</p>
          </fieldset>
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
</style>
