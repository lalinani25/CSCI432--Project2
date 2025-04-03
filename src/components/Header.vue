<script setup>
    import { RouterLink } from 'vue-router';
    import Logo from './Logo.vue'

    console.log("header")
</script>

<template>
    <header>
        <div class="container">
            <RouterLink :to="($route.path !== '/main' && $route.path !== '/profile' 
                && $route.path !== '/search' && $route.path !== '/searchTeams' 
                && $route.path !== '/searchPlayers' && $route.path !== '/searchGames'
            ) ? '/' : '/main'">

       <Logo /> </RouterLink>
            <slot></slot>
        </div>
    </header>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:slotted(*) {
    font-size: var(--fs-600);
}

</style>