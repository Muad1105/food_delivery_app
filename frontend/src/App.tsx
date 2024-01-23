import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./page/Signup.js";
import Login from "./page/Login.js";
import Home from "./page/Home.js";
import Admin from "./page/admin/Admin.js";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
