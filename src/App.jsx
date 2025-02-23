import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen min-w-full">
      <Sidebar />
      {/* <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover />} />
      </Routes> */}
    </div>
  );
}

export default App;
