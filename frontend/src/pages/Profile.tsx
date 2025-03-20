// import { jwtDecode } from "jwt-decode";
// import React, { useEffect, useState } from "react";
// import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

// interface User {
//   _id?: string; // Include _id for the update function
//   name: string;
//   budget: string;
//   location: string;
//   interests: string[];
//   images: string[];
// }

// const Profile = ({ authToken }: { authToken: string }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (authToken) {
//         try {
//           const decoded: any = jwtDecode(authToken);
//           const userId = decoded.userId;

//           const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${authToken}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error("Failed to fetch user data");
//           }

//           const userData: User = await response.json();
//           setUser(userData);
//           // setFormData(userData); // Initialize form data with user data
//           setFormData({
//             ...userData,
//             interests: Array.isArray(userData.interests) ? userData.interests : [], // Ensure interests is an array
//           });
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [authToken]);

//   // Function to handle input changes in the edit form
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     // Ensure formData is not null before updating
//     if (formData) {
//       setFormData((prev) => ({
//         ...prev!,
//         [name]: value, // Use non-null assertion
//       }));
//     }

    
//   };

//   // Function to handle form submission for updating user info
//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3000/api/users/${user?._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update user data");
//       }

//       const updatedUser: User = await response.json();
//       setUser(updatedUser);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };
//   // Function to handle next image
//   const nextImage = () => {
//     if (user) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === user.images.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   // Function to handle previous image
//   const prevImage = () => {
//     if (user) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? user.images.length - 1 : prevIndex - 1
//       );
//     }
//   };
//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold p-5">My Profile</h1>
//       <section className="flex flex-col justify-self-center ">
//         <div className="w-200 bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
//           <div className="relative w-full h-150">
//             <img src={user.images[currentImageIndex]} alt="Profile" className="w-full h-full object-cover object-top" />

//             <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full">
//               <SlArrowLeftCircle className="w-6 h-6" />
//             </button>

//             <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 p-2 rounded-full">
//               <SlArrowRightCircle className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="p-4">
//             {isEditing ? (
//               <form onSubmit={handleUpdate} className="space-y-4">
//                 <input type="text" name="name" value={formData?.name || ""} onChange={handleInputChange} required className="border p-2 w-full" />
//                 <input type="text" name="budget" value={formData?.budget || ""} onChange={handleInputChange} required className="border p-2 w-full" />
//                 <input type="text" name="location" value={formData?.location || ""} onChange={handleInputChange} required className="border p-2 w-full" />
//                 <textarea
//                   name="interests"
//                   value={Array.isArray(formData?.interests) ? formData.interests.join(", ") : ""}
//                   onChange={handleInputChange}
//                   placeholder="Interests (comma-separated)"
//                   className="border p-2 w-full"
//                 />
//                 <button type="submit" className="!bg-blue-500 text-white p-2 rounded">
//                   Save Changes
//                 </button>
//               </form>
//             ) : (
//               <>
//                 <h3 className="text-3xl font-semibold">{user.name}</h3>
//                 <p className="text-2xl font-semibold text-gray-600">Budget: {user.budget}</p>
//                 <p className="text-2xl font-semibold text-gray-600">Location: {user.location}</p>
//                 <p className="text-2xl font-semibold text-gray-600">Interests: {user.interests.join(", ")}</p>
//                 <button
//                   onClick={() => {
//                     setIsEditing(true);
//                     setFormData(user); // Populate form with current user data
//                   }}
//                   className="!bg-green-500 text-white p-2 rounded mt-4"
//                 >
//                   Edit Profile
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </section>
//       <h1 className="text-2xl font-bold p-5">Matches</h1>
//       <section>
//         {/* Display matches here */}
//       </section>
//     </div>
//   );
// };

// export default Profile;
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

interface User {
  _id?: string; // Include _id for the update function
  name: string;
  budget: string;
  location: string;
  interests: string[];
  roomType: string;
  images: string[];
}

const Profile = ({ authToken }: { authToken: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          const decoded: any = jwtDecode(authToken);
          const userId = decoded.userId;

          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData: User = await response.json();
          setUser(userData);
          setFormData({
            ...userData,
            roomType: userData.roomType || "", // Ensure roomType is always a string
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [authToken]);

  // Function to handle input changes in the edit form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    
    if (formData) {
      if (name === "interests") {
        setFormData((prev) => ({
          ...prev!,
          interests: value.split(",").map((interest) => interest.trim()), // Splitting and trimming extra spaces
        }));
      }
      else {
        setFormData((prev) => ({
          ...prev!,
          [name]: value,
        }));
      }
    }
  };

  // Function to handle form submission for updating user info
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/users/${user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-5">My Profile</h1>
      <section className="flex flex-col justify-self-center">
        <div className="w-200 bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          {
            user.images.length > 0 ?

          <div className="relative w-full h-150">

              <img
                src={user.images[currentImageIndex]}
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />

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
          </div> : <></>
          }

          <div className="p-4">
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  required
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="budget"
                  value={formData?.budget || ""}
                  onChange={handleInputChange}
                  required
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={formData?.location || ""}
                  onChange={handleInputChange}
                  required
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="roomType"
                  value={formData?.roomType || ""}
                  onChange={handleInputChange}
                  placeholder="Room Type"
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="interests"
                  value={formData?.interests.join(", ") || ""}
                  onChange={handleInputChange}
                  required
                  className="border p-2 w-full"
                />                
                <button type="submit" className="!bg-blue-500 text-white p-2 rounded">
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <h3 className="text-3xl font-semibold">{user.name}</h3>
                <p className="text-2xl font-semibold text-gray-600">Budget: {user.budget}</p>
                <p className="text-2xl font-semibold text-gray-600">Location: {user.location}</p>
                <p className="text-2xl font-semibold text-gray-600">Interests: {user.interests.join(", ")}</p>
                <p className="text-2xl font-semibold text-gray-600">Room Type: {user.roomType}</p>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setFormData(user); // Populate form with current user data
                  }}
                  className="!bg-green-500 text-white p-2 rounded mt-4"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <h1 className="text-2xl font-bold p-5">Matches</h1>
      <section>{/* Display matches here */}</section>
    </div>
  );
};

export default Profile;
