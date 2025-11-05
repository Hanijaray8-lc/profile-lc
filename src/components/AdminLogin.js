import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin, error }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username === "lc" && password === "123") {
      navigate("/userlist");
    } else if (onLogin) {
      onLogin(username, password);
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    navigate("/userlogin");
  };

  // Responsive width for tab view
  const getWidth = () => {
    if (window.innerWidth > 600 && window.innerWidth <= 900) return 600; // Tab view
    return "90%"; // Mobile and desktop
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: getWidth(),
          maxWidth: 700,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          fontFamily={"jost"}
          color="#26ada8ff"
          align="center"
          gutterBottom
        >
          Admin Login
        </Typography>
        <Typography
          variant="body2"
          fontFamily={"jost"}
          align="center"
          color="text.secondary"
          mb={3}
        >
          Welcome back, please enter your credentials.
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            inputRef={usernameRef}
            autoComplete="username"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            inputRef={passwordRef}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              mb: 1,
              bgcolor: "#1976d2",
              fontWeight: "bold",
              textTransform: "none",
              fontFamily: "jost",
              fontSize: 15,
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Log in
          </Button>
        </form>
        <Box textAlign="center" mt={1} fontFamily={"jost"}>
          <Link href="#" variant="body2" color="#1976d2" sx={{ fontFamily: "'Jost', sans-serif" ,fontSize:"15px"}}>
            Forgot Password?
          </Link>
        </Box>
        <Box textAlign="center" mt={2} fontFamily={"jost"}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif",fontSize:"15px" }}>
             UserLogin?{" "}
            <Link
              href="#"
              color="#1976d2"
              fontWeight="bold"
              sx={{ fontFamily: "'Jost', sans-serif" }}
              onClick={handleUserLogin}
            >
              UserLogin
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;