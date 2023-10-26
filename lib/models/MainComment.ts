import dayjs from "dayjs";
import mongoose, { Schema } from "mongoose";

const MainCommentSchema = new Schema(
  {
    _id: { type: Number, required: true },
    nick: { type: String, required: true },
    email: { type: String, required: true },
    email_md5: { type: String, required: true },
    link: { type: String, default: "" },
    content: { type: String, required: true },
    is_admin: Boolean,
    is_hidden: Boolean,
    format_time: {
      type: String,
      default: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    },
    path: { type: String, required: true, default: "" },
    relpy: { type: Number, default: 0 },
  },
  { versionKey: false },
);

const MainCommentModel =
  mongoose.models.maincomment ||
  mongoose.model("maincomment", MainCommentSchema);

export default MainCommentModel;
