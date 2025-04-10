<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const threeViewsRef = ref(null);

const scrollToThreeViews = () => {
  if (threeViewsRef.value) {
    document.body.style.overflow = "hidden"; 
    threeViewsRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 1000); 
  }
};

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

  if (response.ok && response.status === 200) {
    localStorage.removeItem("token")
    localStorage.removeItem('userLog')
    router.push('/')
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

// Delete User
async function Delete(event) {
  const confirmDelete = window.confirm("Would you like to proceed with DELETING your account?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");
  const url = 'https://csci-430-server-dubbabadgmf8hpfk.eastus2-01.azurewebsites.net/user/me';

  const options = {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  };

  try {
    let response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      router.push('/');
    } else {
      alert("HTTP-Error: " + response.status);
    }
  } catch (error) {
    console.error("Error during deletion:", error);
  }
}
</script>


<template>
	<Header>
	  <nav>
		<RouterLink to="/placeBets" class="button" @click="scrollToThreeViews">Bets</RouterLink>
		<RouterLink to="/search" class="button" @click="scrollToThreeViews">Search</RouterLink>
  
		<div class="dropdown">
		  <div class="dropdown-button">
			<img src="/userIcon.png" alt="User Icon" />
		  </div>
		  <div class="dropdown-content">
			<RouterLink to="/profile" @click="scrollToThreeViews">Profile</RouterLink>
			<RouterLink to="/userBets" @click="scrollToThreeViews">My Bets</RouterLink>
			<a @click="signOut">Log Out</a>
			<a @click="Delete">Delete</a>
		  </div>
		</div>
	  </nav>
	</Header>
  
	<main>
	  <section class="hero">
		<div class="hero-left">
		  <h1>Welcome to NBA FAN!</h1>
		  <p class="subheading">The perfect place to bet and win!</p>
		  <p class="subheading">Start by searching your favorite:</p>
		  <div class="search-bar">
			<RouterLink to="/searchTeams" class="button" @click="scrollToThreeViews">Teams</RouterLink>
			<RouterLink to="/searchPlayers" class="button" @click="scrollToThreeViews">Players</RouterLink>
			<RouterLink to="/searchGames" class="button" @click="scrollToThreeViews">Games</RouterLink>
		  </div>
		</div>
		<div class="hero-right">
		  <img src="/players.png" alt="Court Image" />
		</div>
	  </section>
  
	  <section class="threeViews" ref="threeViewsRef">
		<RouterView name="leftSidebar" class="grid-panel" id="left-grid"></RouterView>
		<RouterView name="focus" class="grid-panel vline" id="middle-grid"></RouterView>
		<RouterView name="rightSidebar" class="grid-panel vline" id="right-grid"></RouterView>
	  </section>
	</main>
  </template>
  

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px 0;
}

.button {
  padding: 10px 15px;
  background: none;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.button:hover {
  color: var( --clr-accent-500);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-button img {
  width: 30px;
  height: auto;
  border-radius: 50%;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  min-width: 140px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  margin-right: -110px;
  pointer-events: auto;
}

.dropdown-content a {
  color: #333;
  padding: 10px 15px;
  display: block;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.dropdown-content a:hover {
  background-color: var(--clr-accent-500);
  cursor: pointer;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 10%;
  height: 100vh;
}

.hero-left {
  max-width: 50%;
}

.hero-left h1 {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  text-align: center;
}

.subheading {
  text-align: center;
  color: #ffffff;
  margin-bottom: 25px;
  font-size: 18px;
}

.search-bar {
  display: flex;
  gap: 100px;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tags span {
  background-color: #000;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.hero-right img {
  width: 400px;
  max-width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.threeViews {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  min-height: calc(100vh - 60px); 
  padding: 30px;
  background: rgb(0, 0, 0);
}

.grid-panel {
  padding: 10px;
  margin: 5px;
}

#middle-grid {
  border-left: 2px solid #000000;
  border-right: 2px solid #000000;
}

#left-grid,
#right-grid {
  border-left: 2px solid #000;
  border-right: 2px solid #000;
}

</style>
