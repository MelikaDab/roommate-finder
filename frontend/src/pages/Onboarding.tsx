import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import decoder


const Onboarding = ({ authToken }: { authToken: string }) => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: "", // This should be fetched from auth state
    name: "",
    budget: "",
    location: "",
    preferences: { roomType: "", smoking: false, pets: false },
    images: [],
    interests: [],
  });
  // Decode userId from token
  useEffect(() => {
    if (authToken) {
      try {
        const decoded: any = jwtDecode(authToken);
        // console.log(decoded)
        setFormData((prev) => ({ ...prev, userId: decoded.userId }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [authToken]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        preferences: {
        ...prev.preferences,
        [name]: e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : value,
        },
    }));
    };
    
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting onboarding data:", formData); // Log the payload

    e.preventDefault();

    try {
      const response = await fetch(`/auth/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit onboarding details");
      }

      const data = await response.json();
      console.log("Onboarding success:", data);

      localStorage.setItem("hasCompletedOnboarding", "true");
      navigate("/discover"); // Redirect after completion

    } catch (error) {
      console.error("Error submitting onboarding form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="border p-2 w-full" />
        <input type="number" name="budget" placeholder="Budget" onChange={handleChange} required className="border p-2 w-full" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="border p-2 w-full" />

        {/* Preferences */}
        <div>
          <label>Room Type:</label>
          <select name="roomType" onChange={handlePreferencesChange} value={formData.preferences.roomType} className="border p-2 w-full">
            <option value="Private">Private</option>
            <option value="Shared">Shared</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <label>
            <input type="checkbox" name="smoking" onChange={handlePreferencesChange} /> Smoking
          </label>
          <label>
            <input type="checkbox" name="pets" onChange={handlePreferencesChange} /> Pets
          </label>
        </div>

        <button type="submit" className="!bg-red-300 hover:text-black focus:!bg-red-800 rounded p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
