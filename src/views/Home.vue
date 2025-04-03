<script setup>
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'

</script>

<template>
    <Header>
        <nav>
            <RouterLink class= "button-style" to="/signup">SIGN UP</RouterLink>
            <RouterLink class= "button-style" to="/login">LOG IN</RouterLink>
        </nav>
    </Header>

    <main class="padding-block-700">
        <section class="container center vertical" id="homepage">
            <img src="/LogoHomePage.png">
        </section>
    </main>
</template>

<style scoped>

:deep(a) {
    text-decoration: none;
    margin: 20px;
}

img {
   max-width: 400px;
   margin-top: -30px;
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


</style>