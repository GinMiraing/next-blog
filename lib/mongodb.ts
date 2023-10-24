"use server";

import mongoose, { Schema } from "mongoose";

export const connect = async () => {
  const connectUrl =
    process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs";

  try {
    await mongoose.connect(connectUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);

    throw new Error("Could not connect to MongoDB");
  }
};

const commentSchema = new Schema({
  name: String,
  text: String,
});

export const Comment =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
