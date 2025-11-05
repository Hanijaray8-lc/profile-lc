import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const backgroundUrl =
  "https://wallpaperaccess.com/full/1159955.jpg"; // You can use any image URL

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          textAlign: "center",
          fontFamily:"Trade Winds",
          mt: 45,
          px: 2,
        }}
      >
        LC Presented
      </Typography>
    </Box>
  );
};

export default Landing;