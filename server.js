const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
// Increase the limit to 10mb (or more if needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://alphaprojectlc:Tech%40123@alphaproduct.kovyp.mongodb.net/Users?retryWrites=true&w=majority&appName=AlphaProduct", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  businessName: String,
  phone: String,
  email: String,
  address: String,
  regNumber: String,
  website: String,
  profilePic: String,
  companyLogo: String,
  additionalDetails: String,
});

const User = mongoose.model("User", userSchema);

// API to create new user
app.post("/api/users", async (req, res) => {
  try {
    // Check for existing email or phone
    const existing = await User.findOne({
      $or: [
        { email: req.body.email },
        { phone: req.body.phone }
      ]
    });
    if (existing) {
      return res.status(400).json({ error: "Email or mobile number already exists." });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API to get all users (optional)
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));