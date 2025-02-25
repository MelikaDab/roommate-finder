// import { useState } from "react";

// function Profile() {
//   const [matches, setMatches] = useState([]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold">My Profile</h1>

//       <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
//         <p className="font-bold text-4xl">Melika Dabiri</p>
//         <p className="text-gray-600">Budget: $1000/month</p>
//         <p className="text-gray-600">Location: New York</p>
//         <p className="text-gray-600">Interests: Hiking, Music</p>
//         {/* More profile details here */}
//       </div>

//       <h3 className="text-5xl font-bold mt-6">My Matches</h3>
//       <div className="mt-2">
//         {matches.length > 0 ? (
//           matches.map((match, index) => (
//             <div key={index} className="p-4 bg-gray-100 shadow-md rounded-lg mt-2">
//               <p>{match.name}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No matches yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

const Profile = () => {
  const user = {
    name: "Kermit the Frog",
    budget: "$8000",
    location: "San Francisco",
    interests: "Hiking, Music, Tech",
    images: [
      "../public/kermit-snow.jpg",
      "../public/kermit-smile.webp",
      // "https://via.placeholder.com/300x200?text=Image+3",
    ],
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === user.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? user.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-80 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-48">
        <img
          src={user.images[currentImageIndex]}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        
        {/* Left and Right Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <SlArrowLeftCircle className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <SlArrowRightCircle className="w-6 h-6" />
        </button>
      </div>

      {/* User Information */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">Budget: {user.budget}</p>
        <p className="text-gray-600">Location: {user.location}</p>
        <p className="text-gray-600">Interests: {user.interests}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Match
        </button>
      </div>
    </div>
  );
};


export default Profile;


