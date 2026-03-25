import axios from 'axios';

const API_KEY = '0af0cd9069db28f3e96dc2963b6a4fd3'; // Отримайте на openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherApi = {
  getCurrentWeather(city: string, lang: string = 'uk') {
    return axios.get(`${BASE_URL}/weather`, {
      params: { q: city, units: 'metric', appid: API_KEY, lang }
    });
  },

  getForecast(city: string, lang: string = 'uk') {
    return axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, units: 'metric', appid: API_KEY, lang }
    });
  },

  searchCities(query: string) {
    return axios.get(`${GEO_URL}/direct`, {
      params: { q: query, limit: 5, appid: API_KEY }
    });
  },

  async getCityByIP() {
    const res = await axios.get('https://ipapi.co/json/');
    return res.data.city;
  }
};