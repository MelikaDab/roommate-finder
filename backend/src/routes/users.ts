import { UserDetailsProvider } from "../UserDetailsProvider";
import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({path: '../.env'}); // Read the .env file in the current working directory, and load values into process.env.


export function registerUserRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/users", (req: Request, res: Response) => {
        // let userId: string | undefined = undefined;
        // if (typeof req.query.createdBy === "string") {
        //     userId = req.query.createdBy;
        //     // console.log("user id: ", userId)
        // }       
        const userProvider = new UserDetailsProvider(mongoClient);
        userProvider.getAllUsers()
            .then(users => res.json(users))
            .catch(error => res.status(500).json({ error: error.message }));
    });    
}