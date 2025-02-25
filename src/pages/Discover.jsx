import { useState } from "react";
import Card from "../components/Card";

const sampleUsers = [
  { id: 1, name: "Mr. Bean", budget: "$900", location: "San Diego, CA", interests: "Music, Teddy bears",
   images: ["../public/mrbean_teddy.jpg"] },
  { id: 2, name: "Michael Scott", budget: "$800", location: "Los Angeles, CA", interests: "Gaming, Cooking", images: ["../public/michael-scott.webp"] },
];

function Discover() {
  const [matches, setMatches] = useState([]);

  const handleMatch = (user) => {
    setMatches((prev) => [...prev, user]);
  };

  return (
  <div className="p-6 flex w-full flex-col">
    <h1 className="text-2xl font-bold">Discover Roommates</h1>
    <div className="mt-4">
      {sampleUsers.map((user) => (

        <Card key={user.id} user={user} />
      ))
      }
    </div>
  </div>
  );
}

export default Discover;
        // <div key={user.id} className="p-4 bg-white shadow-md rounded-lg mt-4">
        //   <h3 className="text-lg font-bold">{user.name}</h3>
        //   <p className="text-gray-600">Budget: {user.budget}</p>
        //   <p className="text-gray-600">Location: {user.location}</p>
        //   <p className="text-gray-600">Interests: {user.interests}</p>
        //   <button
        //     onClick={() => handleMatch(user)}
        //     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        //   >
        //     Match
        //   </button>
        // </div>