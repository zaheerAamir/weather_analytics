import React from "react";
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
import { Box, Typography, Paper } from "@mui/material";

export const TemperatureChart = ({ data, unit }) => {
  const formatTemperature = (temp) => {
    if (unit === "fahrenheit") {
      return ((temp * 9) / 5 + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, mb: 2, width: "100%", minWidth: "600px", overflow: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Temperature Trend
      </Typography>
      <Box sx={{ width: "100%", minHeight: "300px", minWidth: "500px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(timestamp) => {
                try {
                  return new Date(timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                } catch (error) {
                  console.error("Date formatting error:", error);
                  return "Invalid Time";
                }
              }}
            />
            <YAxis
              label={{
                value: `Temperature (°${unit === "celsius" ? "C" : "F"})`,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              labelFormatter={(timestamp) => {
                try {
                  return new Date(timestamp).toLocaleString();
                } catch (error) {
                  console.error("Date formatting error:", error);
                  return "Invalid Date";
                }
              }}
              formatter={(value) =>
                formatTemperature(value) + `°${unit === "celsius" ? "C" : "F"}`
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export const PrecipitationChart = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, mb: 2, width: "100%", minWidth: "600px", overflow: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Precipitation
      </Typography>
      <Box sx={{ width: "100%", minHeight: "300px", minWidth: "500px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(time) =>
                new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis
              label={{
                value: "Precipitation (mm)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="precipitation"
              fill="#82ca9d"
              stroke="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export const WindChart = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, mb: 2, width: "100%", minWidth: "600px", overflow: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Wind Speed
      </Typography>
      <Box sx={{ width: "100%", minHeight: "300px", minWidth: "500px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(time) =>
                new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis
              label={{
                value: "Wind Speed (m/s)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
