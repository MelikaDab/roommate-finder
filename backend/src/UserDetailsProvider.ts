import { Collection, MongoClient, ObjectId, WithId } from "mongodb";
import { UserDocument } from "./interfaces";

export class UserDetailsProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllUsers() : Promise<WithId<UserDocument>[]> {
        const db = this.mongoClient.db();
        const usersCollection: Collection<UserDocument> = db.collection<UserDocument>("users"); // Assuming "users" is the collection name

        const users = await usersCollection.find().toArray()
        console.log(users)
        return users;
    }

    async createUser(user: UserDocument) {
        const db = this.mongoClient.db();
        const usersCollection = db.collection<UserDocument>("users");
        
        await usersCollection.insertOne(user);
    }

    async getUserById(userId: string): Promise<WithId<UserDocument> | null> {
        const db = this.mongoClient.db();
        const usersCollection: Collection<UserDocument> = db.collection<UserDocument>("users"); // Assuming "users" is the collection name

        try {
            const user = await usersCollection.findOne({ _id: userId }); // Find user by ID
            return user; // Return the user document or null if not found
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Database query failed");
        }
    }

    async updateUserById(userId: string, updatedData: Partial<UserDocument>): Promise<WithId<UserDocument> | null> {
        const db = this.mongoClient.db();
        const usersCollection = db.collection<UserDocument>("users");
        try {
            const result = await usersCollection.updateOne(
                { _id: userId }, // Find user by ID
                { $set: updatedData } // Update the user with new data
            );

            if (result.modifiedCount === 0) {
                return null; // No user found or no changes made
            }

            // Fetch the updated user document
            const updatedUser = await usersCollection.findOne({ _id: userId });
            return updatedUser; // Return the updated user document
        } catch (error) {
            console.error("Error updating user by ID:", error);
            throw new Error("Database query failed");
        }
    }    

    async updateUserMatches(userId: string, matchId: string): Promise<WithId<UserDocument> | null> {
        const db = this.mongoClient.db();
        const usersCollection = db.collection<UserDocument>("users");    
        try {
            const result = await usersCollection.updateOne(
                { _id: userId }, // Find user by ID
                { $addToSet: { matches: matchId } } // Add matchId to matches array, preventing duplicates
            );

            if (result.modifiedCount === 0) {
                return null; // No user found or no changes made
            }

            // Fetch the updated user document
            const updatedUser = await usersCollection.findOne({ _id: userId });
            return updatedUser; // Return the updated user document
        } catch (error) {
            console.error("Error updating user matches:", error);
            throw new Error("Database query failed");
        }
    }
    
}

