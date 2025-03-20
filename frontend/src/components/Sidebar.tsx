import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  toggleDarkMode: () => void;  // Function type for toggling dark mode
  isDarkMode: boolean;          // Boolean type for dark mode state
}

function Sidebar({ toggleDarkMode, isDarkMode }: SidebarProps) {
  return (
    <nav className={`h-100lvh w-64 ${isDarkMode ? "bg-red-800" : "bg-red-400"} p-10 flex flex-col`}>
      <p className="text-black text-4xl font-bold mb-6">Roommate finder</p>
      <div className="space-y-4">
        <Link to="/discover" className="!text-white block text-2xl p-2 hover:bg-red-300 rounded">Discover</Link>
        <Link to="/profile" className="!text-white block text-2xl p-2 hover:bg-red-300 rounded">Profile</Link>
      </div>
      <button 
        onClick={toggleDarkMode}
        className={`p-2 m-2 rounded-md ${isDarkMode ? "!bg-gray-700 text-white" : "!bg-gray-200 text-black"}`}
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </nav>

  );
}

export default Sidebar;


