<script setup>

console.log("Hello");

    const username = localStorage.getItem('username');
</script>

<template>
    <div class="flex justify-center align-center">
        <!--div class="basketball-container">
            <img src="/basket.png" alt="Bouncing Basketball" class="basketball" />
        </div>
       <h1> Welcome {{username}}!!!</h1-->
    </div>
</template>

<style scoped>

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}


.basketball-container {
  position: relative;
}


.basketball {
  max-width: 100px; 
  height: auto;
  animation: bounce 2s infinite ease-in-out;
}

@keyframes bounce {
  0% {
    transform: translateY(0); 
  }
  25% {
    transform: translateY(-20px); 
  }
  50% {
    transform: translateY(0); 
  }
  75% {
    transform: translateY(-10px); 
  }
  100% {
    transform: translateY(0); 
  }
}


h1 {
  text-align: center;
  font-family: Helvetica;
  font-size: 23px;
}
</style>
