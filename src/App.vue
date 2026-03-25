<template>
  <div class="container">
    <Navigation v-model="currentTab" />

    <div v-if="currentTab === 'home'" class="weather-grid">
      <TheWeather 
        v-for="w in widgets" 
        :key="w.id" 
        @remove="requestDelete(w.id)" 
      />
      <button v-if="widgets.length < 5" class="add-btn" @click="addWidget">+</button>
    </div>

    <div v-else class="weather-grid">
      <div v-if="favStore.items.length === 0" class="no-favs">
        {{ $t('weather.noFavorites') }}
      </div>
      <TheWeather 
        v-for="city in favStore.items" 
        :key="city" 
        :initialCity="city" 
        isFavoriteView 
      />
    </div>

    <ModalConfirm 
      v-if="widgetToDelete" 
      :title="$t('weather.removeConfirmTitle')" 
      @confirm="confirmDelete" 
      @cancel="widgetToDelete = null"
    >
      {{ $t('weather.removeConfirmText') }}
    </ModalConfirm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFavoritesStore } from './stores/favorites';
import Navigation from './components/Navigation.vue';
import TheWeather from './components/TheWeather.vue';
import ModalConfirm from './components/ModalConfirm.vue';

const currentTab = ref('home');
const favStore = useFavoritesStore();
const widgets = ref([{ id: '1' }]);
const widgetToDelete = ref<string | null>(null);

const addWidget = () => {
  if (widgets.value.length < 5) widgets.value.push({ id: crypto.randomUUID() });
};

const requestDelete = (id: string) => widgetToDelete.value = id;

const confirmDelete = () => {
  widgets.value = widgets.value.filter(w => w.id !== widgetToDelete.value);
  widgetToDelete.value = null;
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  min-width: 460px;
  margin: 0 auto;
  padding: 20px;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
  border: 3px dashed #bdc3c7;
  border-radius: 20px;
  font-size: 5rem;
  color: #bdc3c7;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #fff;
  color: #42b883;
  border-color: #42b883;
}

@media (max-width: 400px) {
  .weather-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 10px;
  }
}
</style>
