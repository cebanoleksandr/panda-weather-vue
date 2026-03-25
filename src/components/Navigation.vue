<template>
  <nav class="main-nav">
    <div class="tabs">
      <button 
        :class="{ active: modelValue === 'home' }" 
        @click="$emit('update:modelValue', 'home')"
      >
        {{ $t('nav.home') }}
      </button>
      <button 
        :class="{ active: modelValue === 'favorites' }" 
        @click="$emit('update:modelValue', 'favorites')"
      >
        {{ $t('nav.favorites') }} ({{ favStore.items.length }})
      </button>
    </div>
    
    <div class="lang-switcher">
      <select v-model="$i18n.locale" @change="onLanguageChange">
        <option value="en">EN</option>
        <option value="uk">UA</option>
        <option value="pl">PL</option>
        <option value="es">ES</option>
      </select>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '../stores/favorites';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const favStore = useFavoritesStore();
defineProps<{ modelValue: string }>();
defineEmits(['update:modelValue']);

const onLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  localStorage.setItem('user-locale', target.value);
};
</script>

<style scoped>
.main-nav { 
  margin-bottom: 2rem; 
  border-bottom: 1px solid #eee; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}
.tabs { display: flex; gap: 20px; }
button {
  padding: 12px 4px; background: none; border: none; cursor: pointer;
  font-size: 1.1rem; border-bottom: 3px solid transparent; transition: 0.3s;
  color: black;
}
button.active { border-color: #42b883; color: #42b883; font-weight: bold; }

.lang-switcher select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  color: black;
}
.lang-switcher select:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.1);
  outline: #42b883;
}
</style>
