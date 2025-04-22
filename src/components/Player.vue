<script setup>

import { ref, watch, onMounted, useTemplateRef } from 'vue';
import Modal from '@/components/Modal.vue';

const props = defineProps({ name: String, lname: String, team: String, logo: String, player_id: Number })

const isFavorite = ref(false);
const selectedPlayer = ref(null);
const selectedPlayerData = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');

const modal = useTemplateRef('name-modal');

const token = localStorage.getItem('token');

const fetchFavoriteStatus = async () => {
  try {
    const response = await fetch('https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/favorite-players', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    isFavorite.value = data.favoritePlayers.includes(props.player_id.toString());
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

onMounted(() => {
  fetchFavoriteStatus();
});

const toggleFavorite = async () => {
  if (isFavorite.value) {
    const success = await removeFavPlayer(props.player_id);
    if (success) isFavorite.value = false;
  } else {
    const success = await addFavoritePlayer(props.player_id);
    if (success) isFavorite.value = true;
  }
};

const addFavoritePlayer = async (playerId) => {
  const url = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/favorite-players`;
  const data = { player_id: playerId };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add favorite!');
    console.log('Added to favorites!');
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const removeFavPlayer = async (playerId) => {
  const url = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/favorite-players/${playerId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to remove favorite!');
    console.log('Removed from favorites!');
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="card">
    <button @click="toggleFavorite" class="fav">

      <span class="fa fa-star" :class="{ checked: isFavorite, unchecked: !isFavorite }"></span>
    </button>

    <div>
      <img :src="logo" alt="Team Logo" class="logo-icon"/>
    </div>

    <div class="player-details">
      <fieldset id="profile-fieldset">
        <legend>Name</legend>
        <p>{{ name }} {{ lname }}</p>
      </fieldset>

      <fieldset id="profile-fieldset">
        <legend>Team</legend>
        <p>{{ team }}</p>
      </fieldset>

      <div>
      <button @click="getPlayersDetails(player_id)" class="details"> <img src="/details.png" class="icon" /></button>
    </div>
    </div>

   
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

</template>

<style scoped>
h1 {
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

.logo-icon {
  max-width: 130px;
  max-height: 130px;
}

.player-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
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

#modal-main-content {
  max-height: 400px;  
  overflow-y: auto;   
  padding-right: 5px; 
}

.checked {
  color: var(--clr-accent-500);  
}

.unchecked {
  color: gray;  
}

.fa-star {
  font-size: 20px;
}

.details{
  padding: 5px 5px;
  background: none;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  border: 2px;
  border-radius: 30px;
  border-color: var(--clr-accent-500);
  cursor: pointer;
  transition: color 0.3s ease;
}

.details:hover {
  background-color: var(--clr-accent-500); 
}

.details:active {
  background-color: var(--clr-accent-500); 
}

.fav {
  background-color: var(--clr-primary-400);
  color: var(--clr-neutral-100);
}
h2 {
  font-size: 24px;
  margin-top: 10px;
  margin-left: 90px;
}

.icon {
    max-width: 30px;
    max-height: 30px;
}
</style>