import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    _id: {
      type: Number,
      default: Date.now(),
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    email_md5: {
      type: String,
      required: true,
      default: "",
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_hidden: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
    nick: {
      type: String,
      required: true,
      default: "",
    },
    path: {
      type: String,
      required: true,
      default: "/",
    },
    reply: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: "comments",
  },
);

const Comment = models.comment || model("comment", CommentSchema);

export default Comment;
