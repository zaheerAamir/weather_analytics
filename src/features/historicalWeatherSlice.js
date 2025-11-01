import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch historical data for the past 5 days
export const fetchHistoricalWeather = createAsyncThunk(
  "weather/fetchHistorical",
  async (cityName) => {
    const API_KEY = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
    const now = Math.floor(Date.now() / 1000);

    // Get coordinates first
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    const [location] = await geoResponse.json();

    if (!location) {
      throw new Error("City not found");
    }

    // Fetch last 5 days of data
    const timestamps = Array.from(
      { length: 5 },
      (_, i) => now - i * 24 * 60 * 60
    );
    const promises = timestamps.map((timestamp) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&dt=${timestamp}&appid=${API_KEY}&units=metric`
      ).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch historical data");
        return response.json();
      })
    );

    const results = await Promise.all(promises);

    // Format the data
    const historicalData = results.map((result) => ({
      dt: result.dt,
      temp: result.main.temp,
      humidity: result.main.humidity,
      weather: result.weather,
    }));

    return {
      data: historicalData.sort((a, b) => a.dt - b.dt), // Sort by timestamp
    };
  }
);

const historicalWeatherSlice = createSlice({
  name: "historicalWeather",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.meta.arg] = action.payload;
      })
      .addCase(fetchHistoricalWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default historicalWeatherSlice.reducer;
