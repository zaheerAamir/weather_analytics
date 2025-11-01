import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Button,
  Box
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleUnit } from "./features/weatherSlice";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import DetailedView from "./components/DetailedView";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AppContent = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.unit);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(30, 32, 40, 0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            🌦️ <span>Weather Analytics Dashboard</span>
          </Typography>

          {/* Unit toggle + Logout (only if logged in) */}
          {user && (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body2" sx={{ color: "#fff", opacity: 0.9 }}>
                °C
              </Typography>
              <Switch
                checked={unit === "fahrenheit"}
                onChange={() => dispatch(toggleUnit())}
                color="default"
                sx={{
                  "& .MuiSwitch-thumb": { backgroundColor: "#90caf9" },
                  "& .MuiSwitch-track": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              />
              <Typography variant="body2" sx={{ color: "#fff", opacity: 0.9 }}>
                °F
              </Typography>

              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  textTransform: "none",
                  px: 2.5,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>


      <Container
        maxWidth="lg"
        sx={{
          mt: 6,                 // margin-top: space below AppBar
          mb: 4,                 // margin-bottom
          py: 4,                 // vertical padding
          px: 3,                 // horizontal padding
          bgcolor: "background.paper", // use theme’s background color
          borderRadius: 3,       // rounded edges
          boxShadow: 3,          // soft shadow for depth
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <SearchBar />
                  <Dashboard />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:cityName"
            element={
              <PrivateRoute>
                <DetailedView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
