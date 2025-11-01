import { weatherApi } from "../services/weatherApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city) => {
    const weatherData = await weatherApi.getCurrentWeather(city);
    const forecast = await weatherApi.getForecast(city);
    return { weatherData, forecast };
  }
);

const loadState = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    const unit = localStorage.getItem("temperatureUnit");
    return {
      favorites: favorites ? JSON.parse(favorites) : [],
      unit: unit || "celsius",
    };
  } catch (err) {
    return undefined;
  }
};

const savedState = loadState();

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: {},
    forecast: {},
    favorites: savedState?.favorites || [],
    loading: false,
    error: null,
    unit: savedState?.unit || "celsius",
    weatherHistory: {},
    lastUpdate: null,
    weatherData: {}, // Store weather data for multiple cities
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const cityName = action.payload;
      if (state.favorites.includes(cityName)) {
        state.favorites = state.favorites.filter((city) => city !== cityName);
      } else {
        state.favorites.push(cityName);
      }
      // Persist to localStorage
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    toggleUnit: (state) => {
      state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
      // Persist to localStorage
      localStorage.setItem("temperatureUnit", state.unit);
    },
    updateLastFetch: (state) => {
      state.lastUpdate = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.weatherData;
        state.forecast = action.payload.forecast;
        // Store weather data for the city
        state.weatherData[action.payload.weatherData.name] =
          action.payload.weatherData;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, toggleUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
