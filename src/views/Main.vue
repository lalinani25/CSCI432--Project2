<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
//import { storeToRefs } from 'pinia';
//import { useUserStore } from '@/stores/user';

//const userStore = useUserStore()
//const {  username, token} = storeToRefs(userStore)

const router = useRouter()
const username = localStorage.getItem("username")

//Sign Out
async function signOut(event) {

	const token = localStorage.getItem("token")

	const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user/logout'

	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	let response = await fetch(url, options)

	if (response.ok) {
		if (response.status === 200) {
			localStorage.removeItem("token");

			//userStore.$reset()

			if (token.value == '') {
				console.log("Token has been removed!")
			}

			localStorage.removeItem('userLog');

			if(localStorage.getItem('userLog') === null){
				console.log(localStorage.getItem('userLog') === null)
			}
			else{
				console.log(localStorage.getItem('userLog') === null)
			}

			router.push(('/'))
		}
	} else {
		console.log("HTTP-Error: " + response.status)
	}
}

//Delete User
async function Delete(event) {

	const confirm = window.confirm("Would you like to proceed with DELETING your account?");

	if (confirm === false) {
		return;
	}
	else if (confirm === true) {
		const token = localStorage.getItem("token");

		const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user/me';
		const options = {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			},
		};

		try {
			let response = await fetch(url, options);
			console.log(response)
			if (response.ok && response.status === 200) {
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				//userStore.$reset()

				console.log(response)

				if (token === '') {

					console.log("Token has been removed!");
				}
				if (username === null) {

					console.log("User has been removed!");
				}
				router.push(('/'))
			} else {
				alert("HTTP-Error: " + response.status);
				console.log("HTTP-Error: " + response.status);
			}
		} catch (error) {
			console.error("Error during deletion:", error);
		}
	}
}

</script>

<template>
	<Header>
		<nav>
			<RouterLink to="/search" class="button">Search</RouterLink>
			<div class="dropdown"> 
				<a href="#/main" class="dropdown-button">
					<img src="/userIcon.png" alt="User Icon" />
				</a>
				<div class="dropdown-content">
					<RouterLink to="/profile">Profile</RouterLink>
					<a @click="signOut">Log Out</a>
					<a @click="Delete">Delete</a>
				</div>
			</div>
		</nav>
	</Header>

	<main>
		<section class="hero">
			<h2 class="hero-text"> </h2>
		</section>

		<section class="threeViews">
			<RouterView name="leftSidebar" class="grid-panel" id="left-grid"></RouterView>
			<RouterView name="focus" class="grid-panel vline" id="middle-grid"></RouterView>
			<RouterView name="rightSidebar" class="grid-panel vline" id="right-grid"></RouterView>
		</section>
	</main>
</template>

<style scoped>
:deep(a) {
	text-decoration: none;
	color: white;
	margin: 20px;
}

.hero {
	background-image: url('/court.jpeg');
	background-size: cover;
	background-position: center;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: white;
}

.hero-text {
	font-size: 2rem;
	font-weight: bold;
}

.container {
	padding: 20px;
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-button img {
	width: 30px;
	height: auto;
	cursor: pointer;
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: var(--clr-primary-400);
	min-width: 110px;
	margin-top: -20px;
	margin-left: -35px;
	box-shadow: 0px 8px 16px var(--clr-primary-400);
	z-index: 1;
}

.dropdown-content a {
	color: rgb(255, 255, 255);
	text-decoration: none;
	display: block;
	cursor: pointer;
}

.dropdown-content a:hover {
	background-color: var(--clr-accent-300);
}

.dropdown:hover .dropdown-content {
	display: block;
}

.threeViews {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	min-height: 300px;
}

.grid-panel {
	padding: 10px;
	margin: 5px;
}

#middle-grid{
	border-left: 2px solid hsl(50, 3%, 35%); 
	border-right: 2px solid hsl(50, 3%, 35%); 
}

#left-grid{
	border-left: 2px solid hsl(0, 0%, 0%); 
	border-right: 2px solid hsl(0, 0%, 0%); 
}

#right-grid{
	border-left: 2px solid hsl(0, 0%, 0%); 
	border-right: 2px solid hsl(0, 0%, 0%); 
}

nav{
	display: flex;
}


.button {
  padding: 10px 20px;
  background-color:var(---clr-primary-400); 
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  
 
}

</style>
