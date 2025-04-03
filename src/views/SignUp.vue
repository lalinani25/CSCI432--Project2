<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
import validator from 'validator';
//import { useUserStore } from '@/stores/user'

//const userStore = useUserStore()

//const { setUser } = userStore

const router = useRouter()

const email = ref('')
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const userLoggedIn = ref(false)


const errorMessage = ref('')

async function join(e) {

	e.preventDefault()

	errorMessage.value = ''

	
	if (!email.value || !userName.value || !password.value || !confirmPassword.value) {
		errorMessage.value = "Please fill in all the required fields!"
		return;
	}

	if(validator.isEmail(email.value) === false){
		errorMessage.value = "Please enter a valid email address!"
		return;
	}

	const p = password.value;

	if((p.length >= 8) === false){
		errorMessage.value = "Your password needs to be at least 8 characters!"
		return;
	}

	if (password.value !== confirmPassword.value) {
		errorMessage.value = "Passwords do not match! Please try again!"
		return;
	}


	const data = {
		username: userName.value,
		email: email.value,
		password: password.value,	
	}

	console.log(data)

	const jsonData = JSON.stringify(data)

	const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user'

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: jsonData,
	}

	console.log(url)
	console.log(options)

	let response = await fetch(url, options)

	console.log(response.status)

	if (response.status === 201) {
		const data = await response.json()

		localStorage.setItem("token", data.token)
		console.log(data)

		const user = data.user
		console.log(user)

		const username = user.userName
		const email = user.email

		//setUser(firstname, lastname, username, email, token)

		localStorage.setItem('username', username);
		localStorage.setItem('email', email);

		userLoggedIn.value = true

		const userlog = userLoggedIn.value

		localStorage.setItem('userLog', userlog)
		console.log(localStorage.getItem('userLog'))

		router.push(('/main'))
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
			<RouterLink to="/login" class= "button-style">LOG IN</RouterLink>
		</nav>
	</Header>

	<main class="padding-block-700">
		<div class=" container1">
			<section class="container center">
				<div id="form">
			
					<label for="username">Username</label>
					<input type="text" id="username" v-model="userName" />

					<label for="email">Email</label>
					<input type="email" id="email" v-model="email" />

					<label for="password">Password</label>
					<input type="password" id="password" v-model="password" />

					<label for="confirm_password">Confirm Password</label>
					<input type="password" id="confirmPassword" v-model="confirmPassword" />

					<button class="button" @click="join">SIGN UP</button>

					<p v-if="errorMessage"> {{ errorMessage }}</p>
				</div>

			</section>

		</div>
	</main>
</template>

<style scoped>
:deep(a) {
	text-decoration: none;
	margin: 20px;
}

main {
	height: 100vh;
}

.container1 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70vh;
	flex-wrap: wrap;
}

.center {
  width: 90%;
  height: 100%;
  max-width: 350px;
  max-height: 520px ;
  text-align: center;
  background-color: var(--clr-primary-400);
  padding: 20px;
  border-radius: 40px;
  border-style: solid;
  border-color: var(--clr-accent-500);
  box-shadow: 0px 4px 8px var(--clr-accent-500);
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