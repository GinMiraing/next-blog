"use server";

import mongoose from "mongoose";

export const connect = async () => {
  const connectUrl =
    process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs";

  try {
    const client = await mongoose.connect(connectUrl);
  } catch (error) {
    throw new Error("Could not connect to MongoDB");
  }
};
