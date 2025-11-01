import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import historicalWeatherReducer from "../features/historicalWeatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    historicalWeather: historicalWeatherReducer,
  },
});
