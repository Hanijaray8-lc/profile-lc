import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Dialog,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [navValue, setNavValue] = React.useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [user, setUser] = useState(null);
  const [openImg, setOpenImg] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("profileUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/profile");
    if (newValue === 2) navigate("/editprofile");
  };

  const handleOpenImg = (src) => {
    setImgSrc(src);
    setOpenImg(true);
  };

  const handleCloseImg = () => {
    setOpenImg(false);
    setImgSrc("");
  };

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Jost', sans-serif",
        pb: 10,
      }}
    >
      <Box
        sx={{
          width: { xs: "98vw", sm: 600, md: 700 },
          maxWidth: 700,
          mt: 3,
          mb: 10,
          p: { xs: 1, sm: 3, md: 4 },
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* Card background for profile image, name, and business name */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 360, sm: 550, md: 480 },
            ml: { xs: "20px", sm: "20px", md: "auto" },
            mx: "auto",
            mb: 5,
            borderRadius: 3,
            boxShadow: 2,
            bgcolor: "#26ada8ff",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Avatar
            src={user.profilePic}
            alt={user.username}
            sx={{
              width: 90,
              height: 90,
              mb: 1.5,
              boxShadow: 2,
              border: "3px solid #fff",
              bgcolor: "#fff",
              color: "#26ada8ff",
              cursor: "pointer",
            }}
            onClick={() => handleOpenImg(user.profilePic)}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 0.2,
              fontSize: 24,
              color: "#fff",
              fontFamily: "'Jost', sans-serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              fontSize: 17,
              color: "#fff",
              fontFamily: "'Jost', sans-serif",
              opacity: 0.85,
              textShadow: "0 1px 4px rgba(0,0,0,0.10)",
            }}
          >
            {user.businessName}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            bgcolor: "#f7f9fb",
            borderRadius: 2,
            p: { xs: 1, sm: 3, md: 4 },
            mb: 2,
            boxShadow: 1,
            maxWidth: { xs: 500, sm: 600, md: 650 },
            mx: "auto",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: 17,
              color: "#26ada8ff",
              letterSpacing: 0.5,
              fontFamily: "'Jost', sans-serif",
            }}
          >
            Personal Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Full Name
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Business Name
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.businessName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Email
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Phone
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.phone}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Address
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.address}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Company Reg. No
              </Typography>
              <Typography fontWeight={500} sx={{ fontFamily: "'Jost', sans-serif", flex: 1 }}>
                {user.regNumber}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography color="text.secondary" sx={{ fontFamily: "'Jost', sans-serif", minWidth: 130 }}>
                Website
              </Typography>
              <Typography
                component="a"
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontFamily: "'Jost', sans-serif",
                  flex: 1,
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.website}
              </Typography>
            </Box>
          </Box>
          {user.additionalDetails && (
            <Box sx={{ mt: 3 }}>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: 15,
                  width: "80%",
                  mb: 0.5,
                  color: "#26ada8ff",
                  letterSpacing: 0.2,
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Additional Details
              </Typography>
              <Typography sx={{ fontSize: 15, fontFamily: "'Jost', sans-serif" }}>
                {user.additionalDetails}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          fontWeight="bold"
          mb={1}
          sx={{
            color: "#26ada8ff",
            alignSelf: "flex-start",
            fontSize: 15,
            fontFamily: "'Jost', sans-serif",
            ml: 2,
          }}
        >
          Company Logo
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <img
            src={user.companyLogo}
            alt="Company Logo"
            style={{
              width: "90%",
              maxWidth: 450,
              borderRadius: 8,
              border: "1px solid #eee",
              background: "#fff",
              padding: 4,
              cursor: "pointer",
            }}
            onClick={() => handleOpenImg(user.companyLogo)}
          />
        </Box>
      </Box>

      {/* Full screen image dialog */}
      <Dialog open={openImg} onClose={handleCloseImg} maxWidth="md">
        <Box
          sx={{
            width: { xs: "90vw", sm: "600px", md: "700px" },
            height: { xs: "120vw", sm: "400px", md: "500px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
          }}
        >
          <img
            src={imgSrc}
            alt="Full View"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </Box>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={navValue}
        onChange={handleNavChange}
        showLabels
        sx={{
          width: { xs: 700, sm: 650, md: 700 },
          ml:{xs:"",sm:"22px",md:""},
          maxWidth: 700,
          borderRadius: 0,
          boxShadow: 2,
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "#fff",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlinedIcon />}
          sx={{ minWidth: 0, fontFamily: "'Jost', sans-serif" }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonOutlineIcon />}
          sx={{ minWidth: 0, fontFamily: "'Jost', sans-serif" }}
        />
        <BottomNavigationAction
          label="Edit Profile"
          icon={<EditIcon />}
          sx={{ minWidth: 0, fontFamily: "'Jost', sans-serif" }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Profile;