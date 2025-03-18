import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Sidebar from "./components/Sidebar";
import React from "react";

function App() {
  return (
    <div className="min-h-screen flex border">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-red-200 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/discover"/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
        </Routes> 
      </div>
    </div>
  );
}

export default App;
