import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="h-screen w-64 bg-violet-300 p-10 flex flex-col">
      <p className="text-black text-4xl font-bold mb-6">Roommate finder</p>
      <div className="space-y-4">
        <Link to="/discover" className="!text-white block text-2xl p-2 hover:bg-purple-500 rounded">Discover</Link>
        <Link to="/profile" className="!text-white block text-2xl p-2 hover:bg-purple-500 rounded">Profile</Link>
      </div>
    </nav>

  );
}

export default Sidebar;


