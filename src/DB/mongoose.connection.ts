import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from config/.env");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
}
