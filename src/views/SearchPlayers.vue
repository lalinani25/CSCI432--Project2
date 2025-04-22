<script setup>
import { ref, useTemplateRef } from 'vue';
import Player from '@/components/Player.vue';
import Modal from '@/components/Modal.vue';
import { useRouter } from 'vue-router'
const router = useRouter();

const searchQuery = ref('');  
const players = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const teamLogos = [  
    {
      name: "Hawks",
      logo: "/Hawks.png"
    },
    {
      name: "Celtics",
      logo: "/Celtics.png"
    },
    {
      name: "Nets",
      logo: "/Nets.png"
    },
    {
      name: "Hornets",
      logo: "/Hornets.png"
    },
    {
      name: "Bulls",
      logo: "/Bulls.png"
    },
    {
      name: "Cavaliers",
      logo: "/Cavaliers.png"
    },
    {
      name: "Mavericks",
      logo: "/Mavericks.png"
    },
    {
      name: "Nuggets",
      logo: "/Nuggets.png"
    },
    {
      name: "Pistons",
      logo: "/Pistons.png"
    },
    {
      name: "Warriors",
      logo: "/Warriors.png"
    },
    {
      name: "Rockets",
      logo: "/Rockets.png"
    },
    {
      name: "Pacers",
      logo: "/Pacers.png"
    },
    {
      name: "Clippers",
      logo: "/Clippers.png"
    },
    {
      name: "Lakers",
      logo: "/Lakers.png"
    },
    {
      name: "Grizzlies",
      logo: "/Grizzlies.png"
    },
    {
      name: "Heat",
      logo: "/Miami Heat.png"
    },
    {
      name: "Bucks",
      logo: "/Bucks.png"
    },
    {
      name: "Timberwolves",
      logo: "/Timberwolves.png"
    },
    {
      name: "Pelicans",
      logo: "/Pelicans.png"
    },
    {
      name: "Knicks",
      logo: "/Knicks.png"
    },
    {
      name: "Thunder",
      logo: "/Thunder.png"
    },
    {
      name: "Magic",
      logo: "/Magic.png"
    },
    {
      name: "76ers",
      logo: "/76ers.png"
    },
    {
      name: "Suns",
      logo: "/suns.png"
    },
    {
      name: "Trail Blazers",
      logo: "/Bluzers.png"
    },
    {
      name: "Kings",
      logo: "/Kings.png"
    },
    {
      name: "Spurs",
      logo: "/Spurs.png"
    },
    {
      name: "Raptors",
      logo: "/Raptors.png"
    },
    {
      name: "Jazz",
      logo: "/Jazz.png"
    },
    {
      name: "Wizards",
      logo: "/Wizards.png"
    },


]

const getTeamLogo = (teamName) => {
  console.log(teamName)
 

  const logo = teamLogos.find((logo) => logo.name === teamName);



  const logo1 = logo ? { logo: logo.logo } : {}

  return logo1.logo;
};

let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players';  

const fetchPlayers = async () => {
  let searchUrl = url; 
  
    searchUrl += `?name-search=${searchQuery.value}&per_page=50`; 



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


</script>

<template>

  <div class="flex justify-center align-center">
    <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>
  
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
          :logo="getTeamLogo(player.team.name)"
          :player_id = "player.id" 
          @click="getPlayersDetails(player.id)"  
        />
      </div>

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
  gap: 10px; 
  margin-bottom: 10px;
  width: 100%;
  min-width: 500px;
}

input {
  padding: 10px;
  flex-grow: 1; 
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
  background-color: rgb(176, 137, 232); 
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

img {
    max-width: 30px;
    max-height: 30px;
}
</style>
