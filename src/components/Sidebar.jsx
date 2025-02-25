import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="h-100lvh w-64 bg-red-800 p-10 flex flex-col">
      <p className="text-black text-4xl font-bold mb-6">Roommate finder</p>
      <div className="space-y-4">
        <Link to="/discover" className="!text-white block text-2xl p-2 hover:bg-red-300 rounded">Discover</Link>
        <Link to="/profile" className="!text-white block text-2xl p-2 hover:bg-red-300 rounded">Profile</Link>
      </div>
    </nav>

  );
}

export default Sidebar;


