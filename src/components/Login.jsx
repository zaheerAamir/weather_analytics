import React from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 5,
          maxWidth: 420,
          width: "90%",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            mb: 1,
          }}
        >
          🌦 Weather Analytics
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
          Sign in to access your personalized dashboard
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 4 }} />

        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          fullWidth
          size="large"
          sx={{
            background: "linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)",
            backgroundSize: "300%",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            transition: "0.4s ease",
            "&:hover": {
              backgroundPosition: "right center",
              transform: "translateY(-2px)",
              boxShadow: "0 0 25px rgba(0,0,0,0.3)",
            },
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;

