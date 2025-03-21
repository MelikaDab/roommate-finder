import { UserDetailsProvider } from "../UserDetailsProvider";
import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({path: '../.env'}); // Read the .env file in the current working directory, and load values into process.env.


export function registerUserRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/users", (req: Request, res: Response) => {

        const userProvider = new UserDetailsProvider(mongoClient);
        userProvider.getAllUsers()
            .then(users => res.json(users))
            .catch(error => res.status(500).json({ error: error.message }));
    });    

    app.get("/api/users/:id", async (req: Request, res: Response) => {
        const userProvider = new UserDetailsProvider(mongoClient);

        const userId = req.params.id; // Get userId from token
        const user = await userProvider.getUserById(userId); // Implement this method to fetch user data from the database
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    });

    app.put("/api/users/:id", async (req: Request, res: Response) => {
        const userProvider = new UserDetailsProvider(mongoClient);
        const userId = req.params.id; // Get userId from request params
        const updatedData = req.body; // Get updated data from the request body

        try {
            const result = await userProvider.updateUserById(userId, updatedData); // Implement this method
            if (!result) {
                res.status(404).send("User not found or update failed");
                return;
            }
            res.send(result); // Return the updated user
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).send("Internal server error");
        }
    });


    app.post("/api/users/:userId/match", async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const { matchId } = req.body; // The ID of the user to be matched

        try {
            const userProvider = new UserDetailsProvider(mongoClient);

            // Call the new method to update matches
            const updatedUser = await userProvider.updateUserMatches(userId, matchId);

            if (updatedUser) {
                res.status(200).send({ message: "Match added successfully!" });
            } else {
                res.status(404).send({ error: "User not found." });
                return;
            }
        } catch (error) {
            console.error("Error adding match:", error);
            res.status(500).send("Server error");
        }
    });

}