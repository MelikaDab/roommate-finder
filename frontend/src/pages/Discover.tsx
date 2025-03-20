import { useState } from "react";
import Card from "../components/Card";
import React from "react";

const sampleUsers = [
  { id: 1, name: "Mr. Bean", budget: "$900", location: "San Diego, CA", interests: "Music, Teddy bears",
   images: ["../public/mrbean_teddy.jpg"] },
  { id: 2, name: "Michael Scott", budget: "$800", location: "Los Angeles, CA", interests: "Gaming, Cooking", images: ["../public/michael-scott.webp"] },
];

function Discover() {

  return (
  <div className="p-6 flex w-full flex-col">
    <h1 className="text-2xl font-bold">Discover Roommates</h1>
    <div className="mt-4">
      {sampleUsers.map((user) => (

        <Card id={user.id} user={user} />
      ))
      }
    </div>
  </div>
  );
}

export default Discover;
