import { defineStore } from 'pinia';

export interface WeatherWidget {
  id: string;
  city: string;
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    widgets: [{ id: crypto.randomUUID(), city: '' }] as WeatherWidget[],
    favorites: JSON.parse(localStorage.getItem('fav_cities') || '[]') as string[],
    language: 'uk' as 'uk' | 'en'
  }),
  actions: {
    addWidget() {
      if (this.widgets.length < 5) {
        this.widgets.push({ id: crypto.randomUUID(), city: '' });
      }
    },
    removeWidget(id: string) {
      this.widgets = this.widgets.filter(w => w.id !== id);
    },
    toggleFavorite(city: string) {
      const index = this.favorites.indexOf(city);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        if (this.favorites.length >= 5) {
          throw new Error('limit');
        }
        this.favorites.push(city);
      }
      localStorage.setItem('fav_cities', JSON.stringify(this.favorites));
    }
  }
});
