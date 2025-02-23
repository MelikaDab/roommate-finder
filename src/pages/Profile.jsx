import { useState } from "react";

function Profile() {
  const [matches, setMatches] = useState([]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">John Doe</h3>
        <p className="text-gray-600">Budget: $1000/month</p>
        <p className="text-gray-600">Location: New York</p>
        <p className="text-gray-600">Interests: Hiking, Music</p>
        {/* More profile details here */}
      </div>

      <h3 className="text-xl font-bold mt-6">My Matches</h3>
      <div className="mt-2">
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index} className="p-4 bg-gray-100 shadow-md rounded-lg mt-2">
              <p>{match.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No matches yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
