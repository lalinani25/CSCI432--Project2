<script setup>
import { ref, useTemplateRef, computed} from 'vue';
import Game from '@/components/Game.vue';
import Modal from '@/components/Modal.vue';
import { useRouter } from 'vue-router'

const router = useRouter();
const searchQuery = ref('');  
const games = ref([]);
const selectedGame = ref(null); 
const selectedPlayerStats = ref(null); 
const isLoading = ref(false);
const errorMessage = ref('');
const selectedField = ref("");  
const startDate = ref("");      
const endDate = ref("");  
const season = ref("");
const player_fname = ref("");
const player_lname = ref("");


const message = ref('');

const modal = useTemplateRef('name-modal');

function cancel(e) {
  message.value = '';
  modal.value.close(e); 
}


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

function formatDate(date) {
  if (!date) return ''; 
  const [year, month, day] = date.split('-');
  return `${year}-${month}-${day}`; 
}

let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/games';  


const fetchGames = async () => {
  let searchUrl = url; 

  if (selectedField.value === 'player&date') {

    const formattedStartDate = computed(() => formatDate(startDate.value));
    const formattedEndDate = computed(() => formatDate(endDate.value));
    console.log(formattedStartDate.value)
    console.log(formattedEndDate.value)
    
    const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players?name-search=${player_fname.value}`
    
    try {
    const response = await fetch(url1, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      
      console.log(data.data)
    
      let foundPlayer = null;
      
      for (let i = 0; i < data.data.length; i++) {
        const player = data.data[i];
        console.log(player)

        console.log(player.last_name)
        console.log(player_lname.value)
        if (player.last_name === player_lname.value) {
          foundPlayer = player;
          console.log(foundPlayer)
          break; 
        }
      }

      console.log(foundPlayer)
      if (foundPlayer) {
        console.log("Player found:", foundPlayer);
        searchUrl += `/${foundPlayer.id}/${formattedStartDate.value}/${formattedEndDate.value}`; 
        console.log(searchUrl)

      } else {
        console.log("Player not found");
      }

    } else {
      errorMessage.value = 'Failed to fetch players';
    }
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    isLoading.value = false;
  }

}

if (selectedField.value === 'startDate') {

const formattedStartDate = computed(() => formatDate(startDate.value));
console.log(formattedStartDate.value)
searchUrl += `?start_date=${formattedStartDate.value}`; 
console.log(searchUrl)
}

if (selectedField.value === 'season') {


console.log(season.value)
searchUrl += `?start_date=${season.value+1}`; 
console.log(searchUrl)
}


if (selectedField.value === 'both') {

const formattedStartDate = computed(() => formatDate(startDate.value));
const formattedEndDate = computed(() => formatDate(endDate.value));
console.log(formattedEndDate.value)
searchUrl += `?start_date=${formattedStartDate.value}&end_date=${formattedEndDate.value}`; 
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
      games.value = data.data;
      console.log(data)
      console.log(games.value);
    } else {
      errorMessage.value = 'Failed to fetch players';
    }
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    isLoading.value = false;
  }
};

const getGameDetails = async (gameId) => {
  const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/games/${gameId}`;
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
      console.log(data)
      selectedGame.value = data.game;  
      selectedPlayerStats.value = data.playerStats;  
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
    <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>
    <div class="search-engine">
      <h1>GAMES</h1>

      <div class="search-container">
        <div class="search-input-container">
          <input class="search-input"
          v-model="searchQuery" 
          placeholder="Search games by name" 
        />
        <button @click="fetchGames">Search</button>

      </div>

      <div>
        
    <div class="radio-buttons">

      <label>
        <input type="radio" v-model="selectedField" value="season" /> Season
      </label>

     
      <label>
        <input type="radio" v-model="selectedField" value="startDate" /> Date
      </label>

    </div>

      <div class="radio-buttons">
      <label>
        <input type="radio" v-model="selectedField" value="both" /> Start Date to End Date
      </label>

      <label>
        <input type="radio" v-model="selectedField" value="player&date"/> Player & Date
      </label>
    </div>

  </div>
  <div>
    <div v-if="selectedField === 'startDate' || selectedField === 'both' || selectedField === 'player&date'">
      <label for="startDate">Select Start Date:</label>
      <input type="date" v-model="startDate" />
    </div>

    <div v-if="selectedField === 'season'">
      <label for="season">Select Season:</label>
      <input type="number" min="1946" max="2099" v-model="season" />
    </div>
  
    <div v-if="selectedField === 'endDate' || selectedField === 'both' || selectedField === 'player&date'">
      <label for="endDate">Select End Date:</label>
      <input type="date" v-model="endDate" />
    </div>

    <div v-if="selectedField === 'player&date'">
      <label for="season">Enter Player's Name</label>
      <input type="text"  v-model="player_fname" placeholder="Enter player's first name" class="player_input"/>
      <input type="text"  v-model="player_lname" placeholder="Enter player's last name" class="player_input"/>
    </div>
    

   
  </div>

    </div>

      <div id="s-container" class="s-container">
        <Game
          v-for="game in games" 
          :key="game.id" 
          :hTeam="game.home_team.name"
          :vTeam="game.visitor_team.name"
          :season="game.season"
          :logo1="getTeamLogo(game.home_team.name)"
          :logo2="getTeamLogo(game.visitor_team.name)"
         
          @click="getGameDetails(game.id)"  
        />
      </div>

      <Modal ref="name-modal">
        <template #header>
          <h2 class="primary-heading">Game Details</h2>
        </template>

        <template #main>
          <div id="modal-main-content">

            <fieldset id="profile-fieldset">
              <legend>Date</legend>
              <p>{{ selectedGame?.date}}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>{{selectedGame?.home_team}} Score</legend>
              <p>{{ selectedGame?.home_team_score }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>{{selectedGame?.visitor_team}} Score</legend>
              <p>{{ selectedGame?.visitor_team_score}}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
              <legend>Status</legend>
              <p>{{ selectedGame?.status}}</p>
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
  min-width: 500px;
  margin-bottom: 20px;
}

.search-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; 
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
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

.player_input{
  width:15px;
  margin: 2px;
}

img {
    max-width: 30px;
    max-height: 30px;
}

</style>
