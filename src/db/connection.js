import mongoose from "mongoose";
import "dotenv/config";

export const initMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_MONGODB || process.env.URI_MONGODB_LOCAL);
    console.log("Connected to MongoDB 🔥🔥");
  } catch (error) {
    console.log(`${error}😡`);
  }
};
