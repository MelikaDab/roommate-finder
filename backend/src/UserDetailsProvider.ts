import { Collection, MongoClient, WithId } from "mongodb";
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

}

