<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
//import { useUserStore } from '@/stores/user'

//const userStore = useUserStore()

//const { setUser } = userStore

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const userLoggedIn = ref(false)

async function logIn(e) {

	e.preventDefault()

	errorMessage.value = ''

	if (!email.value || !password.value) {

		errorMessage.value = "Please fill in all the required fields!"
		return;

	}

	const data = {
		 email: email.value, 
		 password: password.value }

	const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user/login'

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}

	let response = await fetch(url, options)

	if (response.status === 200) {
		const data = await response.json()

		localStorage.setItem("token", data.token)
		console.log(data)
		console.log(data.token)
	
		const user = data.user
		console.log(user)
		
		const username = user.username
		const firstname = user.firstName
		const lastname = user.lastName
		const email = user.email
		const token = data.token

		//setUser(firstname, lastname, username, email, token)

		localStorage.setItem('username', username);
		localStorage.setItem('firstname', firstname);
		localStorage.setItem('lastname', lastname);
		localStorage.setItem('email', email);
	

		router.push(('/main'))
		
		userLoggedIn.value = true

		const userlog = userLoggedIn.value

		localStorage.setItem('userLog', userlog)
		console.log(localStorage.getItem('userLog'))
	}
	else if (response.status === 400) {
		errorMessage.value = "Invalid credentials. Please try again."
		console.log("Invalid email or password.")
	
		const userlog = userLoggedIn.value
		localStorage.setItem('userLog', userlog)
		console.log(localStorage.getItem('userLog'))
	}
}
</script>

<template>
	<Header>
		<nav>
			<RouterLink to="/" class= "button-style">HOME</RouterLink>
			<RouterLink to="/signup" class= "button-style">SIGN UP</RouterLink>
		</nav>
	</Header>

	<main class="padding-block-700">
		<div class=" container1">
		<section class="container center">
			<div id="form">
				<label for="email">Email</label>
				<input type="text" id="email" v-model="email" />

				<label for="password">Password</label>
				<input type="password" id="password" v-model="password" />

				<button class="button" @click="logIn">Log In</button>

				<p v-if="errorMessage"> {{ errorMessage }}</p>
			</div>
		</section>


		</div>
	</main>
</template>

<style scoped>
:deep(a) {
	text-decoration: none;
	color: hsl(0 0% 100%);
	margin: 20px;
}

main {
  height: 100vh;
}

.center {
  width: 100%;
  height: 40%;
  max-width: 350px;
  text-align: center;
  background-color: var(--clr-primary-400);
  padding: 20px;
  border-radius: 40px;
  margin-top: 100px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
}

.container1 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	flex-wrap: wrap;
	margin-top: -80px;
}

.static-part {
	width: 60%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

img {
	max-width: 100%;
	height: auto;
	object-fit: cover;
	width: 100%;
	height: 100%;
}

.button-style {
  display: inline-block;
  padding: 5px 10px;
  background-color:var(--clr-neutral-100);
  color: var(--clr-primary-400);
  text-align: center;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.button-style:hover {
  background-color: var( --clr-accent-500);
}

@media (max-width: 768px) {
  .container1 {
    flex-direction: column; 
    align-items: center;
    height: auto;
  }

  .form-container {
    width: 80%; 
    margin-bottom: 20px; 
  }

  .static-part {
    width: 80%; 
    margin-top: 20px; 
  }

  .static-part img {
    width: 80%; 
    height: auto; 
  }
}
</style>