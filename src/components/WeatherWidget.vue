<template>
  <div class="widget">
    <div class="controls">
      <input 
        v-model="query" 
        @input="handleSearch" 
        placeholder="Введіть місто..." 
      />
      <ul v-if="suggestions.length" class="suggestions">
        <li v-for="s in suggestions" @click="selectCity(s.name)">
          {{ s.name }}, {{ s.country }}
        </li>
      </ul>
      <button @click="$emit('remove')" class="btn-del">×</button>
    </div>

    <div v-if="loading" class="loader">Завантаження...</div>

    <div v-else-if="weather" class="weather-info">
      <h3>{{ weather.name }} 
        <span @click="store.toggleFavorite(weather.name)" :class="{ active: isFav }">★</span>
      </h3>
      <p class="temp">{{ Math.round(weather.main.temp) }}°C</p>
      <p>{{ weather.weather[0].description }}</p>
      
      <WeatherChart v-if="forecast" :data="forecast.slice(0, 8)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { weatherApi } from '../services/weatherApi';
import { useWeatherStore } from '../stores/weatherStore';
import WeatherChart from './WeatherChart.vue';

const props = defineProps<{ city?: string }>();
const emit = defineEmits(['remove']);
const store = useWeatherStore();

const query = ref(props.city || '');
const weather = ref<any>(null);
const forecast = ref<any>(null);
const suggestions = ref<any[]>([]);
const loading = ref(false);

const isFav = computed(() => store.favorites.includes(weather.value?.name));

const handleSearch = async () => {
  if (query.value.length < 3) return;
  const res = await weatherApi.searchCities(query.value);
  suggestions.value = res.data;
};

const selectCity = async (name: string) => {
  query.value = name;
  suggestions.value = [];
  loading.value = true;
  try {
    const [w, f] = await Promise.all([
      weatherApi.getCurrentWeather(name, store.language),
      weatherApi.getForecast(name, store.language)
    ]);
    weather.value = w.data;
    forecast.value = f.data.list;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.widget { border: 1px solid #ddd; padding: 20px; border-radius: 12px; position: relative; background: #fff; }
.suggestions { position: absolute; background: white; border: 1px solid #ccc; width: 80%; z-index: 10; list-style: none; padding: 0; }
.suggestions li { padding: 8px; cursor: pointer; }
.suggestions li:hover { background: #f0f0f0; }
.active { color: gold; }
.btn-del { position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 20px; cursor: pointer; }
</style>
