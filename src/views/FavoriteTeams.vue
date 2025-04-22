<script setup>
import { ref } from 'vue';
import Teams from '@/components/Teams.vue';

import { useRouter } from 'vue-router'

const router = useRouter();

const teams = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const selectedTeamData = ref(null)
const teamNames = ref([])
const teamConferences = ref([])


const token = localStorage.getItem('token');


const teamLogos = [
    {
        id: 1,
        logo: "/Hawks.png"
    },
    {
        id: 2,
        logo: "/Celtics.png"
    },
    {
        id: 3,
        logo: "/Nets.png"
    },
    {
        id: 4,
        logo: "/Hornets.png"
    },
    {
        id: 5,
        logo: "/Bulls.png"
    },
    {
        id: 6,
        logo: "/Cavaliers.png"
    },
    {
        id: 7,
        logo: "/Mavericks.png"
    },
    {
        id: 8,
        logo: "/Nuggets.png"
    },
    {
        id: 9,
        logo: "/Pistons.png"
    },
    {
        id: 10,
        logo: "/Warriors.png"
    },
    {
        id: 11,
        logo: "/Rockets.png"
    },
    {
        id: 12,
        logo: "/Pacers.png"
    },
    {
        id: 13,
        logo: "/Clippers.png"
    },
    {
        id: 14,
        logo: "/Lakers.png"
    },
    {
        id: 15,
        logo: "/Grizzlies.png"
    },
    {
        id: 16,
        logo: "/Miami Heat.png"
    },
    {
        id: 17,
        logo: "/Bucks.png"
    },
    {
        id: 18,
        logo: "/Timberwolves.png"
    },
    {
        id: 19,
        logo: "/Pelicans.png"
    },
    {
        id: 20,
        logo: "/Knicks.png"
    },
    {
        id: 21,
        logo: "/Thunder.png"
    },
    {
        id: 22,
        logo: "/Magic.png"
    },
    {
        id: 23,
        logo: "/76ers.png"
    },
    {
        id: 24,
        logo: "/suns.png"
    },
    {
        id: 25,
        logo: "/Bluzers.png"
    },
    {
        id: 26,
        logo: "/Kings.png"
    },
    {
        id: 27,
        logo: "/Spurs.png"
    },
    {
        id: 28,
        logo: "/Raptors.png"
    },
    {
        id: 29,
        logo: "/Jazz.png"
    },
    {
        id: 30,
        logo: "/Wizards.png"
    },


]

const getTeamLogo = (teamId) => {
    console.log(teamId)
    const logo = teamLogos.find((logo) => logo.id === teamId);

    console.log(logo ? { logo: logo.logo } : {})

    const logo1 = logo ? { logo: logo.logo } : {}

    return logo1.logo;
};



let url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/favorite-teams';

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
            teams.value[0] = data.favoriteTeams.map(Number)

            console.log(data.favoriteTeams.length)
            for (let i = 0; i < teams.value[0].length; i++) {

                const url1 = `https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/teams/${teams.value[0][i]}`;
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
                        selectedTeamData.value = data.team
                        console.log(selectedTeamData.value)
                        teamNames.value[i] = selectedTeamData.value.name
                        teamConferences.value[i] = selectedTeamData.value.conference
                    } else if (response.status === 404) {
                        errorMessage.value = 'Team not found';
                    }
                } catch (error) {
                    errorMessage.value = 'Error: ' + error.message;
                }

            }

            teams.value[1] = teamNames.value
            teams.value[2] = teamConferences.value
            console.log(teams.value)

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
            <h1>FAVORITE TEAMS</h1>

            <div id="s-container" class="s-container">

            <Teams v-for="(id, index) in teams[0]" :key="id" :name="teams[1][index]" :conference="teams[2][index]"
                :logo="getTeamLogo(id)" :team_id="id" />

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

img {
    max-width: 30px;
    max-height: 30px;
}
</style>
