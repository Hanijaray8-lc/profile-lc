import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#26ada8ff";

const Home = () => {
  const [navValue, setNavValue] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:900px)");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("profileUser");
      if (stored) setProfile(JSON.parse(stored));
    } catch (e) {
      setProfile(null);
    }
  }, []);

  const getWidth = () => {
    if (isMobile) return "98vw";
    if (isTablet) return 640;
    return 920;
  };

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/profile");
    if (newValue === 2) navigate("/editprofile");
  };

  const logoSrc = profile?.companyLogo || "/placeholder-logo.png";

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#f6fbfb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Jost', sans-serif",
        pb: 12,
      }}
    >
      <Box
        sx={{
          width: getWidth(),
          maxWidth: 1200,
          flex: 1,
          overflowY: "auto",
          px: { xs: 1, sm: 2, md: 4 },
          py: { xs: 2, sm: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* HERO */}
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            borderRadius: 3,
            p: { xs: 2, sm: 3, md: 4 },
            overflow: "hidden",
            background: `linear-gradient(135deg, ${PRIMARY} 0%, rgba(38,173,168,0.12) 60%)`,
            color: "#fff",
            boxShadow: "0 12px 40px rgba(38,173,168,0.12)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: { xs: 2, md: 4 },
            mt: { xs: -3, sm: -3}
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 20, sm: 24, md: 32 },
                lineHeight: 1.05,
                mb: 1,
                fontFamily: "'Jost', sans-serif",
                ml:{ xs:1,sm:0}
              }}
            >
              Beautiful company showcase
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 13, sm: 14, md: 16 },
                opacity: 0.95,
                mb: 2,
                fontFamily: "'Jost', sans-serif",
                ml:{ xs:1,sm:0}
              }}
            >
              Our business is built on trust and quality.”
                “We grow by making your dreams real.Your trust is our biggest achievement.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#fff",
                  fontFamily: "'Jost', sans-serif",
                  color: PRIMARY,
                  fontWeight: 700,
                    ml:{ xs:1,sm:0},
                  "&:hover": { bgcolor: "#f2f2f2" },
                  textTransform: "none",
                
                }}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.6)",
                  color: "#fff",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </Button>
            </Stack>
          </Box>

          {/* IMAGE BELOW CONTENT (visually on the right for wide screens, stacks below for mobile) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: isMobile ? 2 : 0,
            }}
            aria-hidden
          >
           
              <img
                src={logoSrc}
                alt="Company"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            
          </Box>
        </Paper>

        {/* CONTENT BLOCK (image already shown in hero; show additional details below) */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 3,
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              flex: 2,
              borderRadius: 3,
              bgcolor: "#fff",
              p: { xs: 2, sm: 3 },
              boxShadow: "0 6px 20px rgba(16,24,40,0.04)",
            }}
          >
            <Typography variant="h6" sx={{ color: PRIMARY, fontWeight: 800, mb: 1,fontFamily: "'Jost', sans-serif" }}>
              About
            </Typography>
            <Typography sx={{ color: "#333", lineHeight: 1.7,fontFamily: "'Jost', sans-serif" }}>
              {profile?.additionalDetails || "No additional details provided."}
            </Typography>
          </Box>
        </Box>
      </Box>

      <BottomNavigation
        value={navValue}
        onChange={handleNavChange}
        showLabels
        sx={{
          width: getWidth(),
          maxWidth: 1200,
          boxShadow: "0 -6px 20px rgba(2,6,23,0.06)",
          position: "fixed",
          bottom: 5,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "#fff",
          borderRadius: 3,
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonOutlineIcon />} />
        <BottomNavigationAction label="Edit Profile" icon={<EditIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Home;
