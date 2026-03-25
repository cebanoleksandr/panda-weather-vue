<!-- <template>
  <div class="weather-widget">
    <div class="widget-header" v-if="!isFavoriteView">
      <div class="search-wrapper">
        <input 
          v-model="searchQuery" 
          @input="handleSearch" 
          placeholder="Пошук міста..." 
        />
        <ul v-if="suggestions.length" class="suggestions">
          <li v-for="s in suggestions" @click="selectCity(s.name)">
            {{ s.name }}, {{ s.country }}
          </li>
        </ul>
      </div>
      <button class="remove-widget" @click="$emit('remove')">✕</button>
    </div>

    <div v-if="loading" class="loader">Завантаження...</div>

    <div v-else-if="weather" class="widget-content">
      <WeatherCard 
        :data="weather" 
        :is-fav="favStore.items.includes(weather.name)"
        @toggle-fav="onToggleFavorite"
      />
      
      <div class="view-toggle">
        <button :class="{active: viewMode === 'day'}" @click="viewMode = 'day'">День</button>
        <button :class="{active: viewMode === 'week'}" @click="viewMode = 'week'">5 Днів</button>
      </div>

      <WeatherChart :data="chartData" :mode="viewMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { weatherApi } from '../services/weatherApi';
import { useFavoritesStore } from '../stores/favorites';
import WeatherCard from './WeatherCard.vue';
import WeatherChart from './WeatherChart.vue';

const props = defineProps<{ initialCity?: string, isFavoriteView?: boolean }>();
const emit = defineEmits(['remove']);
const favStore = useFavoritesStore();

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
      weatherApi.getCurrentWeather(name, 'uk'),
      weatherApi.getForecast(name, 'uk')
    ]);
    weather.value = w.data;
    forecast.value = f.data.list;
  } finally {
    loading.value = false;
  }
};

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
.weather-widget { 
  background: white; border-radius: 20px; padding: 25px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: relative;
}
.search-wrapper { position: relative; flex: 1; }
.widget-header { display: flex; gap: 10px; margin-bottom: 20px; }
.suggestions { 
  position: absolute; top: 100%; left: 0; width: 100%; background: white;
  border: 1px solid #eee; z-index: 100; border-radius: 8px; list-style: none; padding: 0;
}
.suggestions li { padding: 10px; cursor: pointer; border-bottom: 1px solid #f9f9f9; }
.remove-widget { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #ccc; }
.view-toggle { display: flex; gap: 10px; margin: 20px 0; }
.view-toggle button { flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #eee; background: white; cursor: pointer; }
.view-toggle button.active { background: #42b883; color: white; border-color: #42b883; }
</style> -->
