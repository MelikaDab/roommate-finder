import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Sidebar from "./components/Sidebar";
import React, { useState } from "react";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./auth/ProtectedRoute";
function App() {
  const [authToken, setAuthToken] = useState("");
  // console.log("in app authtoken: ", authToken)

  return (
    <div className="min-h-screen flex border">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-red-200 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/discover"/>} />

          <Route path="/profile" element={<ProtectedRoute authToken={authToken}><Profile authToken={authToken}/></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute authToken={authToken}><Discover /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute authToken={authToken}><Onboarding authToken={authToken}/></ProtectedRoute>}/>
          <Route path="/login" element={<Login setToken={setAuthToken}/>}/>
          <Route path="/signup" element={<Signup setToken={setAuthToken} />}/>
        </Routes> 
      </div>
    </div>
  );
}

export default App;
