import mongoose, { Schema } from "mongoose";

const BaseSchema = new Schema(
  {
    admin: { type: String, default: "胤" },
    length: { type: Number, default: 0 },
  },
  { versionKey: false },
);

const BaseModel = mongoose.models.base || mongoose.model("base", BaseSchema);

export default BaseModel;
