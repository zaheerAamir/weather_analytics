import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { fetchWeatherData } from "../features/weatherSlice";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`weather-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TemperatureChart = ({ data, unit }) => {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Temperature Trend
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{
              value: `Temperature (°${unit === "celsius" ? "C" : "F"})`,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            name="Temperature"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const HumidityChart = ({ data }) => {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Humidity
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="humidity"
            fill="#82ca9d"
            stroke="#82ca9d"
            name="Humidity"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

const DetailedView = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { weatherData, forecast, unit, loading } = useSelector(
    (state) => state.weather
  );
  const cityWeather = weatherData[cityName];

  useEffect(() => {
    if (cityName) {
      dispatch(fetchWeatherData(cityName));
    }
  }, [dispatch, cityName]);

  const formatTemperature = (temp) => {
    if (!temp) return "N/A";
    if (unit === "fahrenheit") {
      return ((temp * 9) / 5 + 32).toFixed(1) + "°F";
    }
    return temp.toFixed(1) + "°C";
  };

  const formatHourlyData = () => {
    if (!forecast.list) return [];
    return forecast.list.slice(0, 24).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString(),
      temp: item.main.temp,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      description: item.weather[0].description,
    }));
  };

  const formatDailyData = () => {
    if (!forecast.list) return [];
    const dailyData = [];
    const processedDates = new Set();

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!processedDates.has(date)) {
        processedDates.add(date);
        dailyData.push({
          time: date,
          temp: item.main.temp,
          humidity: item.main.humidity,
          description: item.weather[0].description,
        });
      }
    });
    return dailyData;
  };

  if (loading || !cityWeather) {
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
    <Box sx={{ padding: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {cityName}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">
                {formatTemperature(cityWeather.main?.temp)}
              </Typography>
              <Typography variant="h6">
                {cityWeather.weather[0]?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                Feels like: {formatTemperature(cityWeather.main?.feels_like)}
              </Typography>
              <Typography>Humidity: {cityWeather.main?.humidity}%</Typography>
              <Typography>Wind: {cityWeather.wind?.speed} m/s</Typography>
              <Typography>
                Pressure: {cityWeather.main?.pressure} hPa
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          aria-label="weather forecast tabs"
        >
          <Tab label="24-Hour Forecast" />
          <Tab label="5-Day Forecast" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TemperatureChart data={formatHourlyData()} unit={unit} />
        <HumidityChart data={formatHourlyData()} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TemperatureChart data={formatDailyData()} unit={unit} />
        <HumidityChart data={formatDailyData()} />
      </TabPanel>
    </Box>
  );
};

export default DetailedView;
