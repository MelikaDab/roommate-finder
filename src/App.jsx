import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen max-w-full flex">
      {/* <Sidebar className="flex-1"/> */}
      <div className="w-full bg-red-500">
        <Routes>
          <Route path="/" element={<Navigate to="/profile"/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
