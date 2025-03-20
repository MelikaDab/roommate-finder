// import React from "react";
// import { useState } from "react";
// import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

// const Profile = () => {
//   const user = {
//     name: "Kermit the Frog",
//     budget: "$8000",
//     location: "Sandy eggo",
//     interests: "stand up comedy, music, artificial intelligence",
//     images: [
//       "../public/kermit-snow.jpg",
//       "../public/kermit-smile.webp",
//       "../public/kermit-bonjo.webp", 
//     ],
//   };
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Function to handle next image
//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === user.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Function to handle previous image
//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? user.images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold p-5">My Profile</h1>
//       <section className="flex flex-col justify-self-center ">
//         <div className="w-200 bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          
//           {/* Image Container */}
          
//           <div className="relative w-full h-150">
//             <img
//               src={user.images[currentImageIndex]}
//               alt="Profile"
//               className="w-full h-full object-cover object-top"
//             />
            
//             {/* Left and Right Navigation Buttons */}
//             <button
//               onClick={prevImage}
//               className="absolute top-1/2 left-2 transform -translate-y-1/2  text-gray-400  p-2 rounded-full"
//             >
//               <SlArrowLeftCircle className="w-6 h-6" />
//             </button>
            
//             <button
//               onClick={nextImage}
//               className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400  p-2 rounded-full"
//             >
//               <SlArrowRightCircle className="w-6 h-6" />
//             </button>
//           </div>

//           {/* User Information */}
//           <div className="p-4">
//             <h3 className="text-3xl font-semibold">{user.name}</h3>
//             <p className="text-2xl font-semibold text-gray-600">Budget: {user.budget}</p>
//             <p className="text-2xl font-semibold text-gray-600">Location: {user.location}</p>
//             <p className="text-2xl font-semibold text-gray-600">Interests: {user.interests}</p>
//           </div>
//         </div>
//       </section>
//       <h1 className="text-2xl font-bold p-5">Matches</h1>
//       <section>

//       </section>
//     </div>
//   );
// };


// export default Profile;


import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

interface User {
  name: string;
  budget: string;
  location: string;
  interests: string[];
  images: string[];
}

const Profile = ({authToken} : {authToken: string}) => {
  const [user, setUser] = useState<User | null>(null); // Initialize with null
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          const decoded: any = jwtDecode(authToken);
          const userId = decoded.userId; // Extract userId from the decoded token

          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`, // Pass the token for authentication
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData: User = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [authToken]);

  // Function to handle next image
  const nextImage = () => {
    if (user) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === user.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to handle previous image
  const prevImage = () => {
    if (user) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? user.images.length - 1 : prevIndex - 1
      );
    }
  };

  // If user data is not yet loaded
  if (!user) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-5">My Profile</h1>
      <section className="flex flex-col justify-self-center ">
        <div className="w-200 bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          {/* Image Container */}
          <div className="relative w-full h-150">
            <img
              src={user.images[currentImageIndex]}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />

            {/* Left and Right Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full"
            >
              <SlArrowLeftCircle className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full"
            >
              <SlArrowRightCircle className="w-6 h-6" />
            </button>
          </div>

          {/* User Information */}
          <div className="p-4">
            <h3 className="text-3xl font-semibold">{user.name}</h3>
            <p className="text-2xl font-semibold text-gray-600">Budget: {user.budget}</p>
            <p className="text-2xl font-semibold text-gray-600">Location: {user.location}</p>
            <p className="text-2xl font-semibold text-gray-600">Interests: {user.interests.join(", ")}</p>
          </div>
        </div>
      </section>
      <h1 className="text-2xl font-bold p-5">Matches</h1>
      <section>
        {/* Display matches here */}
      </section>
    </div>
  );
};

export default Profile;
