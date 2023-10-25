import dayjs from "dayjs";
import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    email_md5: { type: String, required: true },
    link: { type: String, default: "" },
    content: { type: String, required: true },
    is_admin: Boolean,
    is_hidden: Boolean,
    is_reply: Boolean,
    reply_to: { type: String, default: "" },
    created_at: {
      type: String,
      default: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    },
  },
  { versionKey: false },
);

const CommentModel =
  mongoose.models.comment || mongoose.model("comment", CommentSchema);

export default CommentModel;
