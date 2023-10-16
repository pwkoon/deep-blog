import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        if (process.env.MONGODB_URI === undefined) {
            throw new Error("MONGODB_URI environment variable is not set.");
          }
          // Use mongodbUri as a string
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}