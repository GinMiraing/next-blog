import axios from "axios";
import {
  CommentSchema,
  FormatedComment,
  FormatedReply,
  ReplySchema,
} from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export const getAllCommentsByPath = async (payload: {
  path: string;
  authKey?: string;
}): Promise<FormatedComment[]> => {
  const { path, authKey } = payload;
  const res = await axiosInstance.get<CommentSchema[]>("/comments", {
    params: {
      path,
    },
    headers: {
      "Api-Key": authKey,
    },
  });

  return res.data.map((comment) => ({
    id: comment._id,
    nick: comment.nick,
    emailMd5: comment.email_md5,
    link: comment.link,
    content: comment.content,
    isAdmin: comment.is_admin,
    isHidden: comment.is_hidden,
    reply: comment.reply,
  }));
};

export const createComment = async (payload: {
  data: {
    nick: string;
    email: string;
    link: string;
    content: string;
    path: string;
  };
  authKey?: string;
}) => {
  const { data, authKey } = payload;
  await axiosInstance.post("/comments", data, {
    headers: {
      "Api-Key": authKey,
    },
  });

  console.log("评论成功");

  return;
};

export const getRepliesByParentId = async (payload: {
  parentId: number;
  authKey?: string;
}): Promise<FormatedReply[]> => {
  const { parentId, authKey } = payload;
  const res = await axiosInstance.get<ReplySchema[]>("/replies", {
    params: {
      parent_id: parentId,
    },
    headers: {
      "Api-Key": authKey,
    },
  });

  return res.data.map((reply) => ({
    id: reply._id,
    nick: reply.nick,
    emailMd5: reply.email_md5,
    link: reply.link,
    content: reply.content,
    isAdmin: reply.is_admin,
    isHidden: reply.is_hidden,
    replyId: reply.reply_id,
    replyNick: reply.reply_nick,
  }));
};

export const getAuthKey = async (): Promise<string> => {
  const res = await axiosInstance.get<{ signature: string }>("/auth");
  return res.data.signature;
};
