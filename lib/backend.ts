import "server-only";
import axios from "axios";
import { CommentSchema, ReplySchema } from "./types";
import { NextResponse } from "next/server";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export const badRequest = () => {
  return new NextResponse(
    JSON.stringify({
      message: "bad request",
      data: null,
      isError: true,
    }),
    {
      status: 400,
    },
  );
};

export const serverError = () => {
  return new NextResponse(
    JSON.stringify({
      message: "server error",
      data: null,
      isError: true,
    }),
    {
      status: 500,
    },
  );
};

export const forbidden = () => {
  return new NextResponse(
    JSON.stringify({
      message: "forbidden",
      data: null,
      isError: true,
    }),
    {
      status: 403,
    },
  );
};

export const getAuthKey = async () => {
  const res = await axiosInstance.get<{ signature: string }>("/auth");

  return res.data.signature;
};

export const getCommentsByPath = async (path: string) => {
  const res = await axiosInstance.get<CommentSchema[]>("/comments", {
    params: {
      path,
    },
  });

  return res.data;
};

export const getRepliesByParentId = async (parentId: number) => {
  const res = await axiosInstance.get<ReplySchema[]>("/replies", {
    params: {
      parent_id: parentId,
    },
  });

  return res.data;
};

export const createComment = async (
  data: {
    nick: string;
    email: string;
    link: string;
    content: string;
    path: string;
  },
  authKey: string,
) => {
  await axiosInstance.post("/comments", data, {
    headers: {
      "Api-Key": authKey,
    },
  });
};

export const createReply = async (
  data: {
    nick: string;
    email: string;
    link: string;
    content: string;
    parentId: number;
    replyId: number;
  },
  authKey: string,
) => {
  await axiosInstance.post("/replies", data, {
    headers: {
      "Api-Key": authKey,
    },
  });
};
