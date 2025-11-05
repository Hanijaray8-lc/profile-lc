import React, { useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultProfilePic =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
const defaultCompanyLogo =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const NewUser = () => {
  const [form, setForm] = useState({
    username: "",
    businessName: "",
    phone: "",
    email: "",
    address: "",
    regNumber: "",
    website: "",
    profilePic: defaultProfilePic,
    companyLogo: defaultCompanyLogo,
    additionalDetails: "",
  });
  const [error, setError] = useState(""); // Add error state
  const profileInputRef = useRef();
  const logoInputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, companyLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate("/userlist");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    try {
      await axios.post("https://profile-lc.onrender.com/api/users", form);
      alert("User created successfully!");
      navigate("/userlist"); // Navigate to admin login after successful creation
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Email or mobile number already exists."
      ) {
        setError("Email or mobile number already used.");
      } else {
        setError("Failed to save user!");
      }
    }
  };

  // Responsive width for tab view only
  const getWidth = () => {
    if (window.innerWidth > 600 && window.innerWidth <= 900) return 600; // Tab view
    return "100%"; // Mobile and desktop
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
          minHeight: 900,
          borderRadius: 3,
          boxShadow: 3,
          p: 0,
          display: "flex",
          flexDirection: "column",
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
            fontWeight={600}
            sx={{ flexGrow: 1, textAlign: "center", ml: -4, fontFamily: "'Jost', sans-serif",color:"#26ada8ff", }}
          >
            Create New User
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            px: 2,
            py: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography fontWeight={500} sx={{ mt: 1,fontFamily: "'Jost', sans-serif" }}>
            Username
          </Typography>
          <TextField
            placeholder="Enter username"
            size="small"
            fullWidth
            value={form.username}
            onChange={handleChange("username")}
          />

          <Typography  sx={{fontFamily: "'Jost', sans-serif"}}fontWeight={500}>Business Name</Typography>
          <TextField
            placeholder="Enter business name"
            size="small"
            fullWidth
            value={form.businessName}
            onChange={handleChange("businessName")}
          />

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Phone Number</Typography>
          <TextField
            placeholder="Enter phone number"
            size="small"
            fullWidth
            value={form.phone}
            onChange={handleChange("phone")}
          />

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Email</Typography>
          <TextField
            placeholder="Enter email"
            size="small"
            fullWidth
            value={form.email}
            onChange={handleChange("email")}
          />

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Address</Typography>
          <TextField
            placeholder="Enter address"
            size="small"
            fullWidth
            value={form.address}
            onChange={handleChange("address")}
          />

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Company Registration Number</Typography>
          <TextField
            placeholder="Enter company registration number"
            size="small"
            fullWidth
            value={form.regNumber}
            onChange={handleChange("regNumber")}
          />

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Website Link</Typography>
          <TextField
            placeholder="Enter website link"
            size="small"
            fullWidth
            value={form.website}
            onChange={handleChange("website")}
          />

          <Typography fontWeight={500} sx={{ mt: 2,fontFamily: "'Jost', sans-serif" }}>
            Profile Picture
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 180,
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
            onClick={() => profileInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
            <img
              src={form.profilePic}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 0,
                width: "100%",
                textAlign: "center",
                color: "#555",
                fontSize: 13,
                fontWeight: 400,
                background: "rgba(255,255,255,0.7)",
              }}
            >
              Click to upload
            </Box>
          </Box>

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Company Logo</Typography>
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
              src={form.companyLogo}
              alt="Company Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 0,
                width: "100%",
                textAlign: "center",
                color: "#555",
                fontSize: 13,
                fontWeight: 400,
                background: "rgba(255,255,255,0.7)",
              }}
            >
              Click to upload
            </Box>
          </Box>

          <Typography sx={{fontFamily: "'Jost', sans-serif"}} fontWeight={500}>Additional Details</Typography>
          <TextField
            placeholder="Enter additional details"
            size="small"
            fullWidth
            multiline
            minRows={3}
            value={form.additionalDetails}
            onChange={handleChange("additionalDetails")}
          />

          {error && (
            <Typography color="error" sx={{ mb: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#1976d2",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              boxShadow: 2,
              mt: 2,
              mb: 1,
              fontFamily: "'Jost', sans-serif",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Save User
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewUser;