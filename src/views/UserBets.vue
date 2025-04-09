<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Scoreboard from '@/components/Scoreboard.vue';

const router = useRouter();

const bets = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const player_fname = ref([])
const player_lname = ref([])
const game_hteam = ref([])
const game_vteam = ref([])
const scores = ref([])
const status = ref([])
const dates = ref([])
const token = localStorage.getItem('token');
const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/bets';

const fetchData = async () => {

    isLoading.value = true;
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
            bets.value = data;
            console.log(bets.value)
            for (let j = 0; j < bets.value.length; j++) {
                scores.value[j] = bets.value[j].score
                status.value[j] = bets.value[j].status

                console.log(scores.value)
                console.log(status.value)
            }
            
        } else {
            errorMessage.value = 'Failed to fetch players';
        }
    } catch (error) {
        errorMessage.value = 'Error: ' + error.message;
    } finally {
        isLoading.value = false;
    }

    errorMessage.value = '';

    for (let j = 0; j < bets.value.length; j++) {
        let url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/players/${bets.value[j].playerId}`;
        try {
            const response = await fetch(url1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();

                const foundPlayer = data.player;

                const player = foundPlayer.data

                console.log(foundPlayer)

                console.log(player.first_name)

                player_fname.value[j] = player.first_name
                player_lname.value[j] = player.last_name

                console.log(player_fname.value)
                console.log(player_lname.value)
            }
        } catch (error) {
            errorMessage.value = 'Error: ' + error.message;
        } finally {
            isLoading.value = false;
        }

        let url2 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/games/${bets.value[j].gameId}`;
        try {
            const response = await fetch(url2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();

                const foundGame = data.game;


                console.log(foundGame)

               

                game_hteam.value[j] = foundGame.home_team
                game_vteam.value[j] = foundGame.visitor_team
                dates.value[j] = foundGame.date

                console.log(game_hteam.value)
                console.log(game_vteam.value)
                console.log(dates.value)
            }
        } catch (error) {
            errorMessage.value = 'Error: ' + error.message;
        } finally {
            isLoading.value = false;
        }
    }


};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="flex justify-center align-center">
        <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>

        <div class="search-engine">
            <h1>USER BETS</h1>

            <div v-if="isLoading">
                <p>Loading...</p>
            </div>

            <div v-if="errorMessage">
                <p style="color: red;">{{ errorMessage }}</p>
            </div>

            <div id="s-container" class="s-container">
                <Scoreboard 
    :players="bets.flatMap(bet => bet.actualStats)" 
    :userBet="bets.flatMap(bet => bet.predictions)" 
    :player_fname="player_fname"
    :player_lname="player_lname" 
    :home_team="game_hteam"
    :visitor_team="game_vteam"
    :dates="dates"
    :scores="scores" 
    :status="status"  />
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
    overflow-x: auto;
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
    max-width: 600px;
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
    max-width: 1100px;
    max-height: 1000px;
    overflow-y: auto;
    overflow-x: auto;
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
