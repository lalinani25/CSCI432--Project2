<script setup>
import { useRouter } from 'vue-router'
import { ref, useTemplateRef } from 'vue'
import Toast from '@/components/Toast.vue';
import Modal from '@/components/Modal.vue';
import { onMounted } from 'vue';
//import { storeToRefs } from 'pinia';
//import { useUserStore } from '@/stores/user';

//const userStore = useUserStore()
//const {token} = storeToRefs(userStore)

const router = useRouter();

const token = localStorage.getItem('token');

const data1 = ref({})

console.log(token)

const username = ref('');
const email = ref('');
const password = ref('');
const favoriteTeams = ref([]);
const favoritePlayers = ref([]);
const message = ref('');

const url = "https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user/me";

const fetchData = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            data1.value = data

            console.log(data1)


            username.value = data.username;
            email.value = data.email;
            //password.value = data.password;
            favoriteTeams.value = data.favoriteTeams;
            favoritePlayers.value = data.favoritePlayers;
            console.log(favoriteTeams.value)
            console.log(favoritePlayers.value)
        } else {
            message.value = "Error: An error occurred while fetching data";
        }
    } catch (error) {
        message.value = "Error: " + error.message;
    }
};

onMounted(() => {
    fetchData();
});

const modal = useTemplateRef('name-modal');

function cancel(e) {
    message.value = '';
    modal.value.close(e); 
}

async function editProfile(e) {
    const userData = {
        username: username.value,
        email: email.value,
        ...(password.value && { password: password.value }),
        favoriteTeams: favoriteTeams.value,
        favoritePlayers: favoritePlayers.value
    };

    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    };

    try {

    
        const response = await fetch(url, options);

        console.log(options)

        if (response.ok) {
            message.value = 'Profile Updated!';
            
            localStorage.setItem('username', userData.username);
            localStorage.setItem('email', userData.email);

            /*
            userStore.$patch((state) => {
                   state.firstName =  userData.firstName
                   state.lastName = userData.lastName
                   state.userName = userData.userName
                   state.email = userData.email
            })
    
            console.log(userStore)
            */
            username.value = userData.username;
            email.value = userData.email;
            password.value = userData.password;
            favoriteTeams.value = userData.favoriteTeams;
            favoritePlayers.value = userData.favoritePlayers;
            
            
            message.value = '';
            modal.value.close(e)

        } else {
            const errorData = await response.json();
            message.value = "Error: " + errorData.message;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        message.value = 'Error with request';
    }
}
</script>

<template>
    <div class="flex justify-center align-center">

        <div class="flex align-center" @click="router.back()">
            <img src="/leftArrow.png" class="icon back-button" />
        </div>

        <div class="flex align-left" @click="modal.open()">
            <img src="/edit.png" class="edit-button" />
        </div>

        <h1 class="primary-heading">My Profile</h1>

        <div class="container">
            <fieldset id="profile-fieldset">
                <legend>Username</legend>
                <p>{{ username }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
                <legend>Email</legend>
                <p>{{ email }}</p>
            </fieldset>

            <fieldset id="profile-fieldset">
                <legend>Favorite Teams</legend>
                <p>No current favorite teams!</p>
            </fieldset>

            <fieldset id="profile-fieldset">
                <legend>Favorite Players</legend>
                <p>No current favorite players!</p>
            </fieldset>

        </div>

        <Toast :message="message" />

        <Modal ref="name-modal">
            <template #header>
                <h2 class="primary-heading">Edit Profile</h2>
            </template>

            <template #main>
                <fieldset id="modal-fieldset">
                    <legend>Username</legend>
                <input v-model="username" type="text" placeholder="Username" />
            </fieldset>
           
            <fieldset id="modal-fieldset">
                <legend>Email</legend>
                <input v-model="email" type="text" placeholder="Email" />
            </fieldset>
            <fieldset id="modal-fieldset">
                <legend>Password</legend>
                <input v-model="password" type="password" placeholder="Reset Your Password" />
            </fieldset>

            <p v-if="message">{{ message }}</p> 
            </template>

            <template #footer>
                <button @click.stop="cancel" id ="cancel-button">Cancel</button>
                <button @click.stop="editProfile" id ="save-button">Save</button>
            </template>
        </Modal>
    </div>
</template>


<style scoped>
h1 {
    color: white;
    text-align: center;
    text-align: center;
    font-family: Brush Script MT, Brush Script Std, cursive;
    font-size: 30px;
    margin: 10px;
}

h2{
    color: white;
    font-family: Brush Script MT, Brush Script Std, cursive;
    font-size: 30px;
    margin: 10px;
    margin-left: 110px;
}

p {
    margin-left: 15px;
}

.container {
    align-items: center;
}

#profile-fieldset {
    position: relative;
    justify-content: space-between;
    max-width: 300px;
    margin-bottom: 10px;
    padding: 5px;
    background-color: hsl(60, 1%, 17%);
    border-radius: 5px;
}

#modal-fieldset{
    max-width: 500px;
    background-color: hsl(60, 1%, 17%);
    border-radius: 5px;
    padding: 5px;
}

legend {
    font-weight: 600;
    color: hsl(0, 1%, 70%);
    margin-left: 10px;
}

img {
    max-width: 30px;
    max-height: 30px;
}

.edit_profile {
    font-weight: 600;
    color: hsl(0, 1%, 70%);
    margin-left: 10px;
}

.edit-button{
    margin-left: 340px;
    margin-top: -30px;
}

#save-button{
    padding: 10px 20px;
  background-color: var(--clr-accent-100);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 40%;
}

#save-button:hover{
    background-color: hsl(0, 3%, 7%);
}

#cancel-button{
    padding: 10px 20px;
  background-color: var(--clr-accent-100);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 40%;
  margin-right: 15px;
}

#cancel-button:hover{
    background-color: hsl(0, 3%, 7%);
}

</style>