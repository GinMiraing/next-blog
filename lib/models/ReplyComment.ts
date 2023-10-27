import mongoose, { Schema } from "mongoose";

const ReplyCommentSchema = new Schema(
  {
    _id: { type: Number, required: true },
    nick: { type: String, required: true },
    email: { type: String, required: true },
    email_md5: { type: String, required: true },
    link: { type: String, default: "" },
    content: { type: String, required: true },
    is_admin: Boolean,
    is_hidden: Boolean,
    path: { type: String, required: true, default: "" },
    parent_id: { type: Number, default: 0 },
    reply_id: { type: Number, default: 0 },
    reply_nick: { type: String, default: "" },
  },
  { versionKey: false },
);

const ReplyCommentModel =
  mongoose.models.replycomment ||
  mongoose.model("replycomment", ReplyCommentSchema);

export default ReplyCommentModel;
