import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserTable from "./components/UserTable";
import Auth from "./auth/Auth";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<UserTable />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
