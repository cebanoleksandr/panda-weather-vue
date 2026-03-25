<template>
  <div class="weather-card-display">
    <div class="card-top">
      <h2>{{ data.name }}, {{ data.sys.country }}</h2>
      <button class="fav-btn" @click="$emit('toggle-fav')">
        <span v-if="isFav">★</span>
        <span v-else>☆</span>
      </button>
    </div>
    
    <div class="main-stats">
      <div class="temp">{{ Math.round(data.main.temp) }}°C</div>
      <div class="details">
        <p>{{ data.weather[0].description }}</p>
        <p>{{ $t('weather.feelsLike') }}: {{ Math.round(data.main.feels_like) }}°C</p>
      </div>
    </div>

    <div class="extra-info">
      <span>{{ $t('weather.humidity') }}: {{ data.main.humidity }}%</span>
      <span>{{ $t('weather.wind') }}: {{ data.wind.speed }} {{ $t('weather.speedUnit') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: any, isFav: boolean }>();
defineEmits(['toggle-fav']);
</script>

<style scoped>
.card-top { display: flex; justify-content: space-between; align-items: flex-start; }
.fav-btn { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #f1c40f; }
.temp { font-size: 3.5rem; font-weight: 800; color: #2c3e50; }
.extra-info { display: flex; justify-content: space-between; margin-top: 15px; color: #7f8c8d; font-size: 0.9rem; }
h2 { color: rgb(24, 22, 22); }
</style>
