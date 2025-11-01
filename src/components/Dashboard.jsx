import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  CircularProgress,
  Paper
} from "@mui/material";
import { Favorite, FavoriteBorder, ArrowForward } from "@mui/icons-material";
import { toggleFavorite, fetchWeatherData } from "../features/weatherSlice";
import { TemperatureChart, WindChart } from "./WeatherChart";

const WeatherCard = ({ city, weather, isFavorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unit } = useSelector((state) => state.weather);

  const formatTemperature = (temp) => {
    if (unit === "fahrenheit") {
      return ((temp * 9) / 5 + 32).toFixed(1) + "°F";
    }
    return temp.toFixed(1) + "°C";
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {city}
            <IconButton
              onClick={() => dispatch(toggleFavorite(city))}
              color="primary"
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate(`/details/${city}`)}
          >
            Details
          </Button>
        </Box>
        <Typography variant="h4">
          {formatTemperature(weather.main.temp)}
        </Typography>
        <Typography variant="subtitle1">
          {weather.weather[0].description}
        </Typography>
        <Typography color="text.secondary">
          Humidity: {weather.main.humidity}%
        </Typography>
        <Typography color="text.secondary">
          Wind: {weather.wind.speed} m/s
        </Typography>
        <Typography color="text.secondary">
          Pressure: {weather.main.pressure} hPa
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  console.log("Dashboard rendered")
  const dispatch = useDispatch();
  const { currentWeather, favorites, forecast, loading, unit, weatherData } =
    useSelector((state) => state.weather);

  // Fetch weather data for favorite cities on component mount
  useEffect(() => {
    favorites.forEach((city) => {
      dispatch(fetchWeatherData(city));
    });
  }, [dispatch, favorites]);

  // Format data for charts
  const formatChartData = () => {
    if (!forecast.list) return [];
    return forecast.list.slice(0, 8).map((item) => ({
      time: item.dt * 1000, // Pass timestamp in milliseconds
      temp: item.main.temp,
      speed: item.wind.speed,
    }));
  };

  if (loading && !currentWeather.name && favorites.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a24 100%)",
        color: "#e0e0e0",
        p: 4,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Current Weather Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "#4fc3f7",
          textShadow: "0 0 8px rgba(79,195,247,0.6)",
        }}
      >
        Current Weather
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {currentWeather?.name && (
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 0 20px rgba(79,195,247,0.3)",
                },
              }}
            >
              <WeatherCard
                city={currentWeather.name}
                weather={currentWeather}
                isFavorite={favorites.includes(currentWeather.name)}
              />
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#4fc3f7",
              textShadow: "0 0 8px rgba(79,195,247,0.6)",
            }}
          >
            Favorite Locations
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {favorites.map(
              (city) =>
                weatherData[city] && (
                  <Grid item xs={12} sm={6} md={4} key={city}>
                    <Paper
                      elevation={4}
                      sx={{
                        p: 2,
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0 0 20px rgba(79,195,247,0.3)",
                        },
                      }}
                    >
                      <WeatherCard
                        city={city}
                        weather={weatherData[city]}
                        isFavorite={true}
                      />
                    </Paper>
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}

      {/* Forecast Charts */}
      {forecast?.list && (
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#4fc3f7",
              textShadow: "0 0 8px rgba(79,195,247,0.6)",
            }}
          >
            Weather Trends
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <TemperatureChart data={formatChartData()} unit={unit} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <WindChart data={formatChartData()} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>





  );
};

export default Dashboard;
