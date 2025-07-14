import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("MongoDB Connected...");
  } catch (error: any) {
    console.error(error.message);
    // Exit process with failure code if connection fails
    process.exit(1);
  }
};

export default mongoose;
export * from "mongoose";
