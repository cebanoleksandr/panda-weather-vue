<template>
  <div class="weather-widget">
    <div class="widget-header" v-if="!isFavoriteView">
      <div class="search-wrapper">
        <input 
          v-model="searchQuery" 
          @input="handleSearch" 
          :placeholder="$t('weather.searchPlaceholder')" 
        />
        <ul v-if="suggestions.length" class="suggestions">
          <li v-for="s in suggestions" @click="selectCity(s.name)">
            {{ s.name }}, {{ s.country }}
          </li>
        </ul>
      </div>
      <button class="remove-widget" @click="$emit('remove')">✕</button>
    </div>

    <div v-if="loading" class="loader">{{ $t('weather.loading') }}</div>

    <div v-else-if="weather" class="widget-content">
      <WeatherCard 
        :data="weather" 
        :is-fav="favStore.items.includes(weather.name)"
        @toggle-fav="onToggleFavorite"
      />
      
      <div class="view-toggle">
        <button :class="{active: viewMode === 'day'}" @click="viewMode = 'day'">{{ $t('weather.day') }}</button>
        <button :class="{active: viewMode === 'week'}" @click="viewMode = 'week'">{{ $t('weather.fiveDays') }}</button>
      </div>

      <WeatherChart :data="chartData" :mode="viewMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { weatherApi } from '../services/weatherApi';
import { useFavoritesStore } from '../stores/favorites';
import { useI18n } from 'vue-i18n';
import WeatherCard from './WeatherCard.vue';
import WeatherChart from './WeatherChart.vue';

const props = defineProps<{ initialCity?: string, isFavoriteView?: boolean }>();
const emit = defineEmits(['remove']);
const favStore = useFavoritesStore();
const { locale } = useI18n();

const searchQuery = ref('');
const weather = ref<any>(null);
const forecast = ref<any[]>([]);
const suggestions = ref<any[]>([]);
const loading = ref(false);
const viewMode = ref<'day' | 'week'>('day');

const chartData = computed(() => {
  return viewMode.value === 'day' ? forecast.value.slice(0, 8) : forecast.value.filter((_, i) => i % 8 === 0);
});

const loadCityData = async (name: string) => {
  loading.value = true;
  try {
    const [w, f] = await Promise.all([
      weatherApi.getCurrentWeather(name, locale.value),
      weatherApi.getForecast(name, locale.value)
    ]);
    weather.value = w.data;
    forecast.value = f.data.list;
  } finally {
    loading.value = false;
  }
};

watch(locale, () => {
  if (weather.value) {
    loadCityData(weather.value.name);
  }
});

const handleSearch = async () => {
  if (searchQuery.value.length < 3) return;
  const res = await weatherApi.searchCities(searchQuery.value);
  suggestions.value = res.data;
};

const selectCity = (name: string) => {
  suggestions.value = [];
  searchQuery.value = '';
  loadCityData(name);
};

const onToggleFavorite = () => {
  try {
    favStore.toggleFavorite(weather.value.name);
  } catch (e: any) {
    alert(e.message);
  }
};

onMounted(async () => {
  const city = props.initialCity || await weatherApi.getCityByIP();
  loadCityData(city);
});
</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #f8f9fa;
  border: 2px solid #edf2f7;
  border-radius: 12px;
  transition: all 0.3s ease;
  outline: none;
}

input:focus {
  background-color: #ffffff;
  border-color: #42b883;
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.1);
}

input::placeholder {
  color: #a0aec0;
}
.weather-widget { 
  background: white; border-radius: 20px; padding: 25px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: relative;
}
.search-wrapper { position: relative; flex: 1; align-items: center; }
.widget-header { display: flex; gap: 10px; margin-bottom: 20px; }
.suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  color: #4a5568;
  transition: background 0.2s ease;
}

.suggestions li:last-child {
  border-bottom: none;
}

.suggestions li:hover {
  background-color: #f0fff4;
  color: #2f855a;
}
.remove-widget {
  background: #fff5f5;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  color: #fc8181;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-widget:hover {
  background: #feb2b2;
  color: #ffffff;
}
.loader {
  text-align: center;
  padding: 20px;
  color: #42b883;
  font-weight: 600;
  letter-spacing: 1px;
}
.view-toggle { display: flex; gap: 10px; margin: 20px 0; }
.view-toggle button { flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #eee; background: white; cursor: pointer; color: black }
.view-toggle button.active { background: #42b883; color: white; border-color: #42b883; }
</style>
