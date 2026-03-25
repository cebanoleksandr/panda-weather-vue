import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('fav_cities') || '[]') as string[],
    maxFavorites: 5
  }),
  actions: {
    toggleFavorite(city: string) {
      const index = this.items.indexOf(city);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        if (this.items.length >= this.maxFavorites) {
          throw new Error(`Максимум ${this.maxFavorites} міст`);
        }
        this.items.push(city);
      }
      this.saveToLocal();
    },
    removeFavorite(city: string) {
      this.items = this.items.filter(item => item !== city);
      this.saveToLocal();
    },
    saveToLocal() {
      localStorage.setItem('fav_cities', JSON.stringify(this.items));
    }
  }
});
