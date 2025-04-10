<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import Scoreboard from '@/components/Scoreboard.vue';
import Modal from '@/components/Modal.vue';

const modal = useTemplateRef('name-modal');

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
const actualStats = ref([])
const predictions = ref([])
const points = ref([])
const assists = ref([])
const rebounds = ref([])
const threes = ref([])
const steals = ref([])
const actualPoints = ref([])
const actualAssists = ref([])
const actualRebounds = ref([])
const actualThrees = ref([])
const actualSteals = ref([])
const pointsDiff = ref([])
const assistsDiff = ref([])
const reboundsDiff = ref([])
const threesDiff = ref([])
const stealsDiff = ref([])
const scoresAvg = ref()
const pointsAvg = ref()
const assistsAvg = ref()
const reboundsAvg = ref()
const threesAvg = ref()
const stealsAvg = ref()

const token = localStorage.getItem('token');
const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/bets?limit=50';

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

            console.log(data)
            console.log(bets.value.length)
            console.log(bets.value)



            for (let j = 0; j < bets.value.length; j++) {
                scores.value[j] = bets.value[j].score
                status.value[j] = bets.value[j].status
                predictions.value[j] = bets.value[j].predictions
                actualStats.value[j] = bets.value[j].actualStats
            }

            console.log(scores.value)
            console.log(status.value)
            console.log(predictions.value)
            console.log(actualStats.value)

            for (let i = 0; i < predictions.value.length; i++) {
                points.value[i] = predictions.value[i].points
                assists.value[i] = predictions.value[i].assists
                rebounds.value[i] = predictions.value[i].rebounds
                threes.value[i] = predictions.value[i].threes
                steals.value[i] = predictions.value[i].steals
            }

            for (let i = 0; i < actualStats.value.length; i++) {
                actualPoints.value[i] = actualStats.value[i].points
                actualAssists.value[i] = actualStats.value[i].assists
                actualRebounds.value[i] = actualStats.value[i].rebounds
                actualThrees.value[i] = actualStats.value[i].threes
                actualSteals.value[i] = actualStats.value[i].steals
            }



            console.log(points.value)
            console.log(assists.value)
            console.log(rebounds.value)
            console.log(threes.value)
            console.log(steals.value)

            console.log(actualPoints.value)
            console.log(actualAssists.value)
            console.log(actualRebounds.value)
            console.log(actualThrees.value)
            console.log(actualSteals.value)

            pointsDiff.value = Array.from({ length: points.value.length }, (_, i) => {
                return Math.abs(points.value[i] - actualPoints.value[i]);
            });

            assistsDiff.value = Array.from({ length: assists.value.length }, (_, i) => {
                return Math.abs(assists.value[i] - actualAssists.value[i]);
            });

            reboundsDiff.value = Array.from({ length: rebounds.value.length }, (_, i) => {
                return Math.abs(rebounds.value[i] - actualRebounds.value[i]);
            });

            threesDiff.value = Array.from({ length: threes.value.length }, (_, i) => {
                return Math.abs(threes.value[i] - actualThrees.value[i]);
            });

            stealsDiff.value = Array.from({ length: steals.value.length }, (_, i) => {
                return Math.abs(steals.value[i] - actualSteals.value[i]);
            });


            const total = scores.value.reduce((acc, score) => acc + score, 0);
            scoresAvg.value = (total / scores.value.length).toFixed(2);
            console.log(scoresAvg.value);

            const total2 = pointsDiff.value.reduce((acc, point) => acc + point, 0);
            pointsAvg.value = (total2 / pointsDiff.value.length).toFixed(2);
            console.log(pointsAvg.value);

            const total3 = assistsDiff.value.reduce((acc, assist) => acc + assist, 0);
            assistsAvg.value = (total3 / assistsDiff.value.length).toFixed(2);
            console.log(assistsAvg.value);

            const total4 = reboundsDiff.value.reduce((acc, rebound) => acc + rebound, 0);
            reboundsAvg.value = (total4 / reboundsDiff.value.length).toFixed(2);
            console.log(reboundsAvg.value);

            const total5 = threesDiff.value.reduce((acc, three) => acc + three, 0);
            threesAvg.value = (total5 / threesDiff.value.length).toFixed(2);
            console.log(threesAvg.value);

            const total6 = stealsDiff.value.reduce((acc, steal) => acc + steal, 0);
            stealsAvg.value = (total6 / stealsDiff.value.length).toFixed(2);
            console.log(stealsAvg.value);




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

            <div class="header-container">
                <h1>USER BETS</h1>
                <button @click="modal.open" class="bet-stats-button">My Statistics</button>
            </div>

            <div v-if="isLoading">
                <p>Loading...</p>
            </div>

            <div v-if="errorMessage">
                <p style="color: red;">{{ errorMessage }}</p>
            </div>

            <div id="s-container" class="s-container">
                <Scoreboard :players="bets.flatMap(bet => bet.actualStats)"
                    :userBet="bets.flatMap(bet => bet.predictions)" :player_fname="player_fname"
                    :player_lname="player_lname" :home_team="game_hteam" :visitor_team="game_vteam" :dates="dates"
                    :scores="scores" :status="status" />
            </div>
        </div>

        <Modal ref="name-modal">
            <template #header>
                <h2 class="primary-heading">Average Bet Statistics</h2>
            </template>

            <template #main>
                <fieldset id="profile-fieldset">
                    <legend>Average Score</legend>
                    <p>{{ scoresAvg }}</p>
                </fieldset>

                <fieldset id="profile-fieldset">
                    <legend>Points</legend>
                    <p>{{ pointsAvg }}</p>
                </fieldset>

                <fieldset id="profile-fieldset">
                    <legend>Assists</legend>
                    <p>{{ assistsAvg }}</p>
                </fieldset>

                <fieldset id="profile-fieldset">
                    <legend>Rebounds</legend>
                    <p>{{ reboundsAvg }}</p>
                </fieldset>

                <fieldset id="profile-fieldset">
                    <legend>Threes</legend>
                    <p>{{ threesAvg }}</p>
                </fieldset>

                <fieldset id="profile-fieldset">
                    <legend>Steals</legend>
                    <p>{{ stealsAvg }}</p>
                </fieldset>
            </template>

            <template #footer>

            </template>
        </Modal>
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

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
}

h1 {
    font-size: 24px;
    margin-left: 470px;
}

h2 {
    font-size: 24px;
    margin-top: 10px;
    margin-left: 90px;
}

.bet-stats-button {
    padding: 10px 20px;
    background-color: var(--clr-primary-400);
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    border-color: var(--clr-accent-400);
}

.bet-stats-button:hover {
    background-color: rgba(222, 204, 248, 0.614);
}

.bet-stats-button:active {
    background-color: rgba(222, 204, 248, 0.614);
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
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--clr-accent-500);
}

p {
    font-size: 16px;
    text-align: center;
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
