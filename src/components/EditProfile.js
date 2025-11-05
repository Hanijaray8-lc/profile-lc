import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [navValue, setNavValue] = useState(2);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const avatarInputRef = useRef();
  const logoInputRef = useRef();

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("profileUser");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          companyLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle field change
  const handleChange = (field) => (e) => {
    setProfile((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Save changes to database and localStorage
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Update user in database
      await axios.put(`https://profile-lc.onrender.com/api/users/${profile._id}`, profile);
      // Update localStorage
      localStorage.setItem("profileUser", JSON.stringify(profile));
      navigate("/profile");
    } catch (err) {
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/profile");
    if (newValue === 2) navigate("/editprofile");
  };

  if (!profile) {
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
          width: { xs: "100vw", sm: 600, md: 700 },
          maxWidth: 700,
          flex: 1,
          overflowY: "auto",
          px: { xs: 1, sm: 3, md: 4 },
          py: { xs: 2, sm: 4, md: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mb: 2,
            maxWidth: 700,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            Edit Profile
          </Typography>
        </Box>

        {/* Card background for profile image, name, and business name */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 360, sm: 550, md: 480 },
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
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profile.profilePic}
              alt={profile.username}
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
              onClick={() => avatarInputRef.current.click()}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 8,
                right: 0,
                bgcolor: "#1976d2",
                color: "#fff",
                width: 36,
                height: 36,
                "&:hover": { bgcolor: "#1565c0" },
              }}
              onClick={() => avatarInputRef.current.click()}
            >
              <PhotoCamera fontSize="small" />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </Box>
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
            {profile.username}
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
            {profile.businessName}
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            width: "100%",
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mb: 2,
          }}
        >
          <TextField
            label="Full Name"
            value={profile.username}
            onChange={handleChange("username")}
            size="small"
            fullWidth
          />
          <TextField
            label="Business Name"
            value={profile.businessName}
            onChange={handleChange("businessName")}
            size="small"
            fullWidth
          />
          <TextField
            label="Email"
            value={profile.email}
            onChange={handleChange("email")}
            size="small"
            fullWidth
          />
          <TextField
            label="Phone Number"
            value={profile.phone}
            onChange={handleChange("phone")}
            size="small"
            fullWidth
          />
          <TextField
            label="Address"
            value={profile.address}
            onChange={handleChange("address")}
            size="small"
            fullWidth
          />
          <TextField
            label="Company Registration Number"
            value={profile.regNumber}
            onChange={handleChange("regNumber")}
            size="small"
            fullWidth
          />
          <TextField
            label="Website Link"
            value={profile.website}
            onChange={handleChange("website")}
            size="small"
            fullWidth
          />
          <TextField
            label="Additional Information"
            value={profile.additionalDetails || ""}
            onChange={handleChange("additionalDetails")}
            size="small"
            fullWidth
            multiline
            minRows={2}
          />

          {/* Company Logo */}
          <Typography fontWeight={500} sx={{ mt: 1, mb: 1 }}>
            Company Logo
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 120,
              border: "2px dashed #d1d5db",
              borderRadius: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              bgcolor: "#f9fafb",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => logoInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={logoInputRef}
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
            <img
              src={profile.companyLogo}
              alt="Company Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "#1976d2",
                color: "#fff",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#1565c0" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                logoInputRef.current.click();
              }}
            >
              <PhotoCamera fontSize="small" />
            </IconButton>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              boxShadow: 2,
              mt: 2,
              mb: 5,
              fontFamily: "'Jost', sans-serif",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={navValue}
        onChange={handleNavChange}
        showLabels
        sx={{
          width: { xs: "100vw", sm: 600, md: 700 },
          maxWidth: 700,
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

export default EditProfile;