import { useState } from "react";
import styles from "./Discover.module.css";

const sampleUsers = [
  { id: 1, name: "Alice", budget: "$900", location: "LA", interests: "Movies, Yoga" },
  { id: 2, name: "Bob", budget: "$800", location: "SF", interests: "Gaming, Cooking" },
];

function Discover() {
  const [matches, setMatches] = useState([]);

  const handleMatch = (user) => {
    setMatches((prev) => [...prev, user]);
  };

  return (
  <div className="p-6 flex w-full flex-col">
    <h2 className="text-2xl font-bold">Discover Roommates</h2>
    <div className="mt-4">
      {sampleUsers.map((user) => (
        <div key={user.id} className="p-4 bg-white shadow-md rounded-lg mt-4">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-gray-600">Budget: {user.budget}</p>
          <p className="text-gray-600">Location: {user.location}</p>
          <p className="text-gray-600">Interests: {user.interests}</p>
          <button
            onClick={() => handleMatch(user)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Match
          </button>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Discover;
