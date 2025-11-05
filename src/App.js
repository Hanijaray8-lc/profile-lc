import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import AdminLogin from "./components/AdminLogin";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";
import UserLogin from "./components/UserLogin";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import UnewUser from "./components/UnewUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/unewuser" element={<UnewUser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
