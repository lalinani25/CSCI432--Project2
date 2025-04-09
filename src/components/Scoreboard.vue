<script setup>
import { computed } from 'vue';

const props = defineProps({
  players: {
    type: Array,
    required: true,
  },
  userBet: {
    type: Array,
    required: true,
  },
  player_fname: {
    type: Array,
    required: true,
  },
  player_lname: {
    type: Array,
    required: true,
  },
  home_team: {
    type: Array,
    required: true,
  },
  visitor_team: {
    type: Array,
    required: true,
  },
  dates: {
    type: Array,
    required: true,
  },
  scores: {
    type: Array,
    required: true,
  },
  status: {
    type: Array,
    required: true,
  }
});


const reversedData = computed(() => {
  return {
    players: [...props.players].reverse(),
    userBet: [...props.userBet].reverse(),
    player_fname: [...props.player_fname].reverse(),
    player_lname: [...props.player_lname].reverse(),
    home_team: [...props.home_team].reverse(),
    visitor_team: [...props.visitor_team].reverse(),
    dates: [...props.dates].reverse(),
    scores: [...props.scores].reverse(),
    status: [...props.status].reverse(),
  };
});
</script>

<template>
  <div class="scoreboard-wrapper">
    <table class="scoreboard-table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Home Team</th>
          <th>Visitor Team</th>
          <th>Date</th>
          <th>Status</th>
          <th>Bet Score</th>
          <th>Points</th>
          <th>Assists</th>
          <th>Threes</th>
          <th>Steals</th>
          <th>Rebounds</th>
          <th>Bet (Points)</th>
          <th>Bet (Assists)</th>
          <th>Bet (Threes)</th>
          <th>Bet (Steals)</th>
          <th>Bet (Rebounds)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in reversedData.players" :key="index">
          <td>{{ reversedData.player_fname[index] }} {{ reversedData.player_lname[index] }}</td>
          <td>{{ reversedData.home_team[index] }}</td>
          <td>{{ reversedData.visitor_team[index] }}</td>
          <td>{{ reversedData.dates[index] }}</td>
          <td>{{ reversedData.status[index] }}</td>
          <td>{{ reversedData.scores[index] }}</td>
          <td>{{ player.points }}</td>
          <td>{{ player.assists }}</td>
          <td>{{ player.threes }}</td>
          <td>{{ player.steals }}</td>
          <td>{{ player.rebounds }}</td>
          <td>{{ reversedData.userBet[index].points }}</td>
          <td>{{ reversedData.userBet[index].assists }}</td>
          <td>{{ reversedData.userBet[index].threes }}</td>
          <td>{{ reversedData.userBet[index].steals }}</td>
          <td>{{ reversedData.userBet[index].rebounds }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.scoreboard-wrapper {
  width: 100%;
  overflow-x: auto; 
  -webkit-overflow-scrolling: touch; 
  padding-bottom: 20px; 
}

.scoreboard-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 1200px;
}

.scoreboard-table th,
.scoreboard-table td {
  padding: 8px 12px;
  text-align: center;
  border: 1px solid var(--clr-accent-500);
}

.scoreboard-table th {
  background-color: var(--clr-accent-400);
  color: var(--clr-accent-100);
}

.scoreboard-table td {
  background-color: hsl(60, 1%, 17%);
  color: white;
}

.scoreboard-table tr:nth-child(even) {
  background-color: hsl(60, 1%, 22%);
}
</style>
