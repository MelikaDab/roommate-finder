import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Sidebar from "./components/Sidebar";
import React, { useEffect, useState } from "react";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./auth/ProtectedRoute";
function App() {
  const [authToken, setAuthToken] = useState("");
  const location = useLocation(); // Get the current location
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  // Determine whether to show the sidebar
  const showSidebar = !["/login", "/signup", "/onboarding"].includes(location.pathname);

  return (
    <div className="min-h-screen flex border">
      {showSidebar && <Sidebar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>}
      <div className={`flex-1 min-h-screen ${isDarkMode? "bg-gray-400":"bg-red-200"} p-6`}>
        <Routes>
          <Route path="/" element={<Navigate to="/discover"/>} />

          <Route path="/profile" element={<ProtectedRoute authToken={authToken}><Profile authToken={authToken}/></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute authToken={authToken}><Discover authToken={authToken}/></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute authToken={authToken}><Onboarding authToken={authToken}/></ProtectedRoute>}/>
          <Route path="/login" element={<Login setToken={setAuthToken}/>}/>
          <Route path="/signup" element={<Signup setToken={setAuthToken} />}/>
        </Routes> 
      </div>
    </div>
  );
}

export default App;
