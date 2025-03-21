import { CredentialsProvider } from "../CredentialsProvider";
import express, { NextFunction, Request, Response, Application } from "express";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserDetailsProvider } from "../UserDetailsProvider";
import { UserDocument } from "interfaces";
dotenv.config({path: '../.env'}); // Read the .env file in the current working directory, and load values into process.env.

const signatureKey = process.env.JWT_SECRET
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey as string, (error, decoded) => {
            if (decoded) {
                res.locals.token = decoded; // modify response object with the decoded token
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

function generateAuthToken(username: string, userId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username, userId: userId },
            signatureKey as string,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    app.post("/auth/register", async (req: Request, res: Response) => {
        const credentialsProvider = new CredentialsProvider(mongoClient);
        // const userDetailsProvider = new UserDetailsProvider(mongoClient);

        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).send({
            error: "Bad request",
            message: "Missing username or password"
            });
            return;
        }

        try {
            const result = await credentialsProvider.registerUser(username, password);
            if (result === false) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
                });           
                return;         
            }

            // Fetch the newly created user's _id
            const userCredsCollection = mongoClient.db().collection("userCreds");
            const user = await userCredsCollection.findOne({ username });

            if (!user) {
                res.status(500).send("Error fetching user data");
                return;
            }
            else {

                const createdToken = await generateAuthToken(username, user._id.toString());
                // console.log("createdToken: ", createdToken)
                res.status(201).send({ token: createdToken });
            }

        } catch(error) {
            // console.log(error)
            res.status(500).send("Server error")
        }

    });

    // Handle onboarding data submission
    app.post("/auth/onboarding", async (req: Request, res: Response) : Promise<void> => {

        const userDetailsProvider = new UserDetailsProvider(mongoClient);
        const { userId, name, budget, location, preferences, images, interests } = req.body;

        if (!userId || !name || !budget || !location || !preferences || !images || !interests) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        try {
            const userDoc: UserDocument = {
                _id: userId, // Use the same _id as in userCreds
                username: "", // Fetch this from userCreds before inserting
                name,
                budget,
                location,
                preferences,
                images,
                interests,
                matches: [],
            };

            // Fetch the username from userCreds before inserting
            const userCredsCollection = mongoClient.db().collection("userCreds");
            const userCreds = await userCredsCollection.findOne({ _id: new ObjectId(userId) });

            if (!userCreds) {
                res.status(404).send({ error: "User credentials not found" });
                return;
            }
            else {
                
                userDoc.username = userCreds.username;
                await userDetailsProvider.createUser(userDoc);
                res.status(201).send({ message: "User profile created successfully" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    });

    app.post("/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const credentialsProvider = new CredentialsProvider(mongoClient);

    if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
    }

    const isValid = await credentialsProvider.verifyPassword(username, password);
    if (!isValid) {
        res.status(401).send("Incorrect username or password");
        return;
    }

    // Fetch userId from database
    const userCredsCollection = mongoClient.db().collection("userCreds");
    const user = await userCredsCollection.findOne({ username });

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    // Create a JWT token with userId
    const createdToken = await generateAuthToken(username, user._id.toString());
    res.send({ token: createdToken });
});
}