import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openImg, setOpenImg] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Add refs for image upload
  const avatarInputRef = useRef();
  const logoInputRef = useRef();

  useEffect(() => {
    axios
      .get("https://profile-lc.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleCreateUser = () => {
    navigate("/newuser");
  };

  const handleBack = () => {
    navigate("/login");
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
    setEditMode(false);
    setEditUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setOpenImg(false);
    setImgSrc("");
    setEditMode(false);
    setEditUser(null);
  };

  const handleOpenImg = (src) => {
    setImgSrc(src);
    setOpenImg(true);
  };

  const handleCloseImg = () => {
    setOpenImg(false);
    setImgSrc("");
  };

  // Start editing
  const handleEdit = () => {
    setEditMode(true);
    setEditUser({ ...selectedUser });
  };

  // Handle field change
  const handleEditChange = (field) => (e) => {
    setEditUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Handle avatar upload in edit mode
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo upload in edit mode
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser((prev) => ({
          ...prev,
          companyLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to database
  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://profile-lc.onrender.com/api/users/${editUser._id}`, editUser);
      setSelectedUser(editUser);
      setEditMode(false);
      setEditUser(null);
      // Optionally refresh user list
      const res = await axios.get("https://profile-lc.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to save changes. Please try again.");
    }
  };

  // Responsive width for tab view
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
          minHeight: 750,
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
            fontFamily: "'Jost', sans-serif",
          }}
        >
          <IconButton size="small" onClick={handleBack}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              ml: -4,
              fontFamily: "'Jost', sans-serif",
              color: "#26ada8ff",
            }}
          >
            Users
          </Typography>
        </Box>

        {/* User List */}
        <Box
          sx={{
            px: 2,
            py: 2,
            flex: 1,
            fontFamily: "'Jost', sans-serif",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            sx={{ fontFamily: "'Jost', sans-serif" }}
          >
            User List
          </Typography>
          <List disablePadding>
            {users.map((user, idx) => (
              <ListItem
                key={user._id || idx}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  mb: 2,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  fontFamily: "'Jost', sans-serif",
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleView(user)}>
                    <VisibilityIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={user.profilePic} alt={user.username} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      fontWeight="bold"
                      sx={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {user.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      fontSize={14}
                      sx={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {user.businessName}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Create User Button */}
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              boxShadow: 2,
              fontFamily: "'Jost', sans-serif",
              "&:hover": { bgcolor: "#1565c0" },
            }}
            startIcon={
              <span
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                +
              </span>
            }
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </Box>
      </Paper>

      {/* User Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: "600px",
            width: "95vw",
            borderRadius: 3,
            m: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "'Jost', sans-serif",
            fontSize: 22,
            pb: 0,
            letterSpacing: 0.5,
            color: "#26ada8ff",
          }}
        >
          User Profile
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && !editMode && (
            <>
              {/* Card background for user image, name, and business name */}
              <Box
                sx={{
                 width: "100%",
            maxWidth: { xs: 340, sm: 500, md: 480 },
                  mx: "auto",
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  bgcolor: "#26ada8ff",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 3,
                  px: 2,
                  ml:{ xs:"-5px", sm:"15px", md:"auto"}
                }}
              >
                <Avatar
                  src={selectedUser.profilePic}
                  alt={selectedUser.username}
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
                  onClick={() => handleOpenImg(selectedUser.profilePic)}
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
                  {selectedUser.username}
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
                  {selectedUser.businessName}
                </Typography>
              </Box>
              {/* The rest remains with default background */}
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "#f7f9fb",
                  borderRadius: 2,
                  p: { xs: 1, sm: 3 },
                  mb: 2,
                  boxShadow: 1,
                  maxWidth: 500,
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
                  }}
                >
                  Personal Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Full Name
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.username}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Business Name
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.businessName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Email
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Phone
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Address
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Company Reg. No
                    </Typography>
                    <Typography fontWeight={500} sx={{ flex: 1 }}>
                      {selectedUser.regNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography color="text.secondary" sx={{ minWidth: 130 }}>
                      Website
                    </Typography>
                    <Typography
                      component="a"
                      href={selectedUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: 500,
                        flex: 1,
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {selectedUser.website}
                    </Typography>
                  </Box>
                </Box>
                {selectedUser.additionalDetails && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: 15,
                        mb: 0.5,
                        color: "#26ada8ff",
                        letterSpacing: 0.2,
                      }}
                    >
                      Additional Details
                    </Typography>
                    <Typography sx={{ fontSize: 15 }}>
                      {selectedUser.additionalDetails}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Typography fontWeight="bold" mb={1} sx={{ color: "#26ada8ff", alignSelf: "flex-start", fontSize: 15 }}>
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
                  src={selectedUser.companyLogo}
                  alt="Company Logo"
                  style={{
                    width: "100%",
                    maxWidth: 450,
                    borderRadius: 8,
                    border: "1px solid #eee",
                    background: "#fff",
                    padding: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenImg(selectedUser.companyLogo)}
                />
              </Box>
            </>
          )}
          {/* Edit Mode */}
          {editMode && editUser && (
            <Box
              sx={{
                fontFamily: "'Jost', sans-serif",
                px: { xs: 0, sm: 2 },
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Avatar with upload */}
              <Box sx={{ position: "relative", mb: 2 }}>
                <Avatar
                  src={editUser.profilePic}
                  alt={editUser.username}
                  sx={{
                    width: 90,
                    height: 90,
                    boxShadow: 2,
                  }}
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
              <TextField
                label="Full Name"
                value={editUser.username}
                onChange={handleEditChange("username")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Business Name"
                value={editUser.businessName}
                onChange={handleEditChange("businessName")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={editUser.email}
                onChange={handleEditChange("email")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                value={editUser.phone}
                onChange={handleEditChange("phone")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Address"
                value={editUser.address}
                onChange={handleEditChange("address")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Company Reg. No"
                value={editUser.regNumber}
                onChange={handleEditChange("regNumber")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Website"
                value={editUser.website}
                onChange={handleEditChange("website")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Additional Details"
                value={editUser.additionalDetails}
                onChange={handleEditChange("additionalDetails")}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              {/* Company Logo with upload */}
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
                  src={editUser.companyLogo}
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
            </Box>
          )}
          {/* Full screen image dialog */}
          <Dialog open={openImg} onClose={handleCloseImg} maxWidth="md">
            <Box
              sx={{
                width: { xs: "90vw", sm: "600px" },
                height: { xs: "120vw", sm: "400px" },
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
        </DialogContent>
        <DialogActions>
          {!editMode && (
            <Button
              onClick={handleEdit}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                bgcolor: "#26ada8ff",
                fontFamily: "'Jost', sans-serif",
                "&:hover": { bgcolor: "#1976d2" },
              }}
            >
              Edit
            </Button>
          )}
          {editMode && (
            <Button
              onClick={handleSaveEdit}
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                fontFamily: "'Jost', sans-serif",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Save
            </Button>
          )}
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              fontFamily: "'Jost', sans-serif",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;