import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute

const getCachedData = (key) => {
  const data = cache.get(key);
  if (data && Date.now() - data.timestamp < CACHE_DURATION) return data.value;
  cache.delete(key);
  return null;
};

const setCachedData = (key, value) => {
  cache.set(key, { value, timestamp: Date.now() });
};

export const weatherApi = {
  getCurrentWeather: async (city) => {
    const key = `current_${city}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const { data } = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    setCachedData(key, data);
    return data;
  },

  getForecast: async (city) => {
    const key = `forecast_${city}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const { data } = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    setCachedData(key, data);
    return data;
  },

  getHourlyForecast: async (lat, lon) => {
    const key = `hourly_${lat}_${lon}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const { data } = await axios.get(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${API_KEY}&units=metric`
    );
    setCachedData(key, data);
    return data;
  },

  searchCities: async (query) => {
    const key = `search_${query}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const { data } = await axios.get(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    setCachedData(key, data);
    return data;
  },

  getHistoricalData: async (lat, lon, dt) => {
    const key = `historical_${lat}_${lon}_${dt}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const { data } = await axios.get(
      `${BASE_URL}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}&units=metric`
    );
    setCachedData(key, data);
    return data;
  },
};

