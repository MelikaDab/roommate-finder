import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Card from "../components/Card";
import {UserDocument} from   "../../../backend/src/interfaces"

const Discover = ({ authToken }: { authToken: string }) => {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDocument | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<UserDocument[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!authToken) return;

      try {
        const decoded: any = jwtDecode(authToken);
        const userId = decoded.userId;

        // Fetch current user data
        const currentUserRes = await fetch(`http://localhost:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!currentUserRes.ok) throw new Error("Failed to fetch current user");
        const currentUserData: UserDocument = await currentUserRes.json();
        setCurrentUser(currentUserData);

        // Fetch all users
        const usersRes = await fetch("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const allUsers: UserDocument[] = await usersRes.json();

        // Remove current user from the list
        const filtered = allUsers.filter((user) => user._id !== userId);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [authToken]);

  useEffect(() => {
    if (!currentUser || users.length === 0) return;

    // Function to calculate compatibility score
    const calculateCompatibility = (user: UserDocument) => {
      let score = 0;

      // Higher priority for same location
      if (user.location === currentUser.location) {
        score += 10;
      }

      // Closer budget gives higher score
      const budgetDifference = Math.abs(user.budget - currentUser.budget);
      score += Math.max(0, 10 - budgetDifference); // Less difference = higher score

      return score;
    };

    // Sort users based on compatibility score (higher is better)
    const sortedUsers = [...users].sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a));
    setFilteredUsers(sortedUsers);
  }, [currentUser, users]);

  return (
    <div className="p-6 flex w-full flex-col">
      <h1 className="text-2xl font-bold">Discover Roommates</h1>
      <div className="mt-4">
        {filteredUsers.map((user) => (
          <Card key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
