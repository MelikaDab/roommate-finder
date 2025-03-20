import React from "react";
import { useState } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import { UserDocument } from "../../../backend/src/interfaces";


interface Props {
  user: UserDocument;
}

const Card = ({user} : Props) => {
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
    <div className="mb-5">
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
              className="absolute top-1/2 left-2 transform -translate-y-1/2  text-gray-400  p-2 rounded-full"
            >
              <SlArrowLeftCircle className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400  p-2 rounded-full"
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

    </div>
  );
};


export default Card;


