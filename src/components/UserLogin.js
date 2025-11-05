import React, { useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = usernameRef.current.value.trim().toLowerCase();
    const mobile = passwordRef.current.value.trim();

    try {
      const res = await axios.get("https://profile-lc.onrender.com/api/users");
      const users = res.data;
      // Debug: see what users are fetched
      // console.log(users, email, mobile);

      const user = users.find(
        (u) =>
          u.email &&
          u.phone &&
          u.email.trim().toLowerCase() === email &&
          u.phone.trim() === mobile
      );

      if (user) {
        setError("");
        localStorage.setItem("profileUser", JSON.stringify(user));
        navigate("/profile");
      } else {
        setError("Invalid email or mobile number");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/login");
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
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: getWidth(),
          maxWidth: 700,
          borderRadius: 3,
          boxShadow: 3,
          p: 0,
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 2,
            borderBottom: "1px solid #eee",
          }}
        >
          <IconButton size="small" onClick={handleBack}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ flexGrow: 1, textAlign: "center", ml: -4, fontFamily: "'Jost', sans-serif", color: "#26ada8ff", fontSize: 28 }}
          >
            User Login
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ px: 3, py: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ mt: 1, fontFamily: "'Jost', sans-serif" }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
            sx={{ fontFamily: "'Jost', sans-serif" }}
          >
            Please enter your details to sign in.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Email"
              variant="outlined"
              inputRef={usernameRef}
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              placeholder="Mobile Number"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              inputRef={passwordRef}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography
                color="error"
                sx={{ mt: 1, mb: 1, textAlign: "center" }}
              >
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
                fontSize: 16,
                textTransform: "none",
                fontFamily: "'Jost', sans-serif",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Login
            </Button>
          </form>
          <Box textAlign="center" mt={1}>
            <Link href="#" variant="body2" color="#1976d2" sx={{ fontFamily: "'Jost', sans-serif", fontSize: "15px" }}>
              Forgot Password?
            </Link>
          </Box>
          <Box textAlign="center" mt={2} mb={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "'Jost', sans-serif", fontSize: "15px" }}
            >
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/unewuser"
                color="#1976d2"
                fontWeight="bold"
                sx={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", cursor: "pointer" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", pb: 2, color: "#888", fontSize: 13 }}>
          © 2023 Admin Systems Inc. All rights reserved.
        </Box>
      </Paper>
    </Box>
  );
};

export default UserLogin;