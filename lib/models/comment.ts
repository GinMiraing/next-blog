import dayjs from "dayjs";
import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    _id: { type: Number, required: true },
    nick: { type: String, required: true },
    email: { type: String, required: true },
    email_md5: { type: String, required: true },
    link: { type: String, default: "" },
    content: { type: String, required: true },
    is_admin: Boolean,
    is_hidden: Boolean,
    parent_id: { type: Number, default: 0 },
    reply_id: { type: Number, default: 0 },
    reply_nick: { type: String, default: "" },
    format_time: {
      type: String,
      default: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    },
    path: { type: String, required: true, default: "" },
  },
  { versionKey: false },
);

const CommentModel =
  mongoose.models.comment || mongoose.model("comment", CommentSchema);

export default CommentModel;
