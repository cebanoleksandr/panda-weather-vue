import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      home: 'Main',
      favorites: 'Favorites'
    },
    weather: {
      searchPlaceholder: 'Search city...',
      loading: 'Loading...',
      day: 'Day',
      fiveDays: '5 Days',
      removeConfirmTitle: 'Delete block',
      removeConfirmText: 'Are you sure you want to delete this weather block?',
      add: 'Add city',
      noFavorites: 'No favorite cities yet',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      speedUnit: 'm/s',
      temperature: 'Temp'
    },
    modal: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
  },
  uk: {
    nav: {
      home: 'Головна',
      favorites: 'Обране'
    },
    weather: {
      searchPlaceholder: 'Пошук міста...',
      loading: 'Завантаження...',
      day: 'День',
      fiveDays: '5 Днів',
      removeConfirmTitle: 'Видалення блоку',
      removeConfirmText: 'Ви впевнені, що хочете видалити цей блок погоди?',
      add: 'Додати місто',
      noFavorites: 'У вас ще немає обраних міст',
      feelsLike: 'Відчувається як',
      humidity: 'Вологість',
      wind: 'Вітер',
      speedUnit: 'м/с',
      temperature: 'Темп'
    },
    modal: {
      confirm: 'Підтвердити',
      cancel: 'Скасувати'
    }
  },
  pl: {
    nav: {
      home: 'Główna',
      favorites: 'Ulubione'
    },
    weather: {
      searchPlaceholder: 'Szukaj miasta...',
      loading: 'Ładowanie...',
      day: 'Dzień',
      fiveDays: '5 Dni',
      removeConfirmTitle: 'Usuń blok',
      removeConfirmText: 'Czy na pewno chcesz usunąć ten blok pogodowy?',
      add: 'Dodaj miasto',
      noFavorites: 'Brak ulubionych miast',
      feelsLike: 'Odczuwalna',
      humidity: 'Wilgotność',
      wind: 'Wiatr',
      speedUnit: 'm/s',
      temperature: 'Temp'
    },
    modal: {
      confirm: 'Potwierdź',
      cancel: 'Anuluj'
    }
  },
  es: {
    nav: {
      home: 'Principal',
      favorites: 'Favoritos'
    },
    weather: {
      searchPlaceholder: 'Buscar ciudad...',
      loading: 'Cargando...',
      day: 'Día',
      fiveDays: '5 Días',
      removeConfirmTitle: 'Eliminar bloque',
      removeConfirmText: '¿Estás seguro de que quieres eliminar este bloque de clima?',
      add: 'Añadir ciudad',
      noFavorites: 'Aún no hay ciudades favoritas',
      feelsLike: 'Sensación térmica',
      humidity: 'Humedad',
      wind: 'Viento',
      speedUnit: 'm/s',
      temperature: 'Temp'
    },
    modal: {
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('user-locale') || 'uk', // default locale
  fallbackLocale: 'en',
  messages,
});

export default i18n;
