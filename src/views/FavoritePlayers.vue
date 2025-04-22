<script setup>
import { ref, useTemplateRef } from 'vue';
import Player from '@/components/Player.vue';

import { useRouter } from 'vue-router'
const router = useRouter();


const selectedPlayer = ref(null);
const selectedPlayerData = ref(null);
const players = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const player_fNames = ref([])
const player_lNames = ref([])
const teamNames = ref([])



const token = localStorage.getItem('token');

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

let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/favorite-players';

const fetchFavoriteTeams = async () => {

    errorMessage.value = '';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            players.value[0] = data.favoritePlayers.map(Number)

            console.log(data.favoritePlayers.length)
            for (let i = 0; i < players.value[0].length; i++) {

                const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players/${players.value[0][i]}`;
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
                        console.log(selectedPlayer.value)
                        player_fNames.value[i] = selectedPlayer.value.first_name
                        player_lNames.value[i] = selectedPlayer.value.last_name
                        teamNames.value[i] = selectedPlayer.value.team.name
            
                    } else if (response.status === 404) {
                        errorMessage.value = 'Player not found';
                    }
                } catch (error) {
                    errorMessage.value = 'Error: ' + error.message;
                } finally {
                    isLoading.value = false;
                }

            }

            players.value[1] = player_fNames.value
            players.value[2] = player_lNames.value
            players.value[3] = teamNames.value
            console.log(players.value)

        } else {
            errorMessage.value = 'Failed to fetch teams';
        }
    } catch (error) {
        errorMessage.value = 'Error: ' + error.message;
    } finally {
        isLoading.value = false;
    }
};

fetchFavoriteTeams()

</script>

<template>

    <div class="flex justify-center align-center">
        <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>

        <div class="search-engine">

            <h1> Favorite Players</h1>

            <div id="s-container" class="s-container">
                <Player v-for="(id, index) in players[0]" :key="id" :name="players[1][index]" :lname="players[2][index]"
                    :team="players[3][index]" :logo="getTeamLogo(players[3][index])" :player_id="id"
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

.search-input {
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

img {
    max-width: 30px;
    max-height: 30px;
}
</style>
