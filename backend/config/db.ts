import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    const DB_URL = process.env.MONGO_URL;
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(DB_URL!);
    console.log("MongoDB Connected...");
  } catch (error: any) {
    console.error(error.message);
    // Exit process with failure code if connection fails
    process.exit(1);
  }
};

export default mongoose;
export * from "mongoose";
