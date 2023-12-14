import { connect } from "mongoose";

const connectDB = async () => {
  const db = await connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017",
    {
      user: process.env.MONGODB_USER || "mongodb",
      pass: process.env.MONGODB_PASSWORD || "password",
      dbName: process.env.MONGODB_DATABASE || "db",
      authSource: "admin",
    },
  );

  return db;
};

export default connectDB;
