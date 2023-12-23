import "server-only";
import axios from "axios";
import { NextResponse } from "next/server";
import { SHA256 } from "crypto-js";
import RedisClient from "./redis/connect";

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

export const generateAuthKey = async () => {
  const timestamp = Date.now().toString();
  const nonce = Math.floor(Math.random() * 100000).toString();

  const signature = SHA256(timestamp + nonce).toString();

  await RedisClient.set(signature, "1", "EX", 20, "NX");

  return signature;
};

export const checkAuthKey = async (authKey: string) => {
  const result = await RedisClient.get(authKey);

  return result ? true : false;
};

export const deleteAuthKey = async (authKey: string) => {
  await RedisClient.del(authKey);
};

export const getCommentsByPath = async (path: string) => {
  const res = await axiosInstance.get<{
    message: string;
    data: {
      id: number;
      nick: string;
      content: string;
      link: string;
      email_md5: string;
      is_admin: boolean;
      timestamp: string;
      reply_count: number;
      reply_list: {
        id: number;
        nick: string;
        content: string;
        link: string;
        email_md5: string;
        is_admin: boolean;
        timestamp: string;
        reply_id: number;
        reply_nick: string;
      }[];
    }[];
  }>("/comments", {
    params: {
      path,
    },
  });

  return res.data.data;
};

export const createComment = async (data: {
  is_reply: boolean;
  nick: string;
  email: string;
  content: string;
  path: string;
  link?: string;
  parent_id?: number;
  reply_id?: number;
  reply_nick?: string;
}) => {
  await axiosInstance.post("/comments", data);
};

export const getPosts = async (params: {
  limit?: number;
  page?: number;
  category?: string;
}) => {
  const res = await axiosInstance.get<{
    message: string;
    data: {
      posts: {
        id: number;
        title: string;
        description: string;
        create_at: string;
        update_at: string;
        category: string;
      }[];
      total: number;
    };
  }>("/posts", {
    params: {
      ...params,
    },
  });

  return res.data.data;
};

export const getPostById = async (id: number) => {
  const res = await axiosInstance.get<{
    message: string;
    data: {
      title: string;
      description: string;
      create_at: string;
      update_at: string;
      source_url: string;
      category: string;
      likes: 0;
    };
  }>(`/posts/${id}`);

  return {
    title: res.data.data.title,
    description: res.data.data.description,
    date: res.data.data.create_at,
    sourceUrl: res.data.data.source_url,
    category: res.data.data.category,
    likes: res.data.data.likes,
  };
};

export const getFriends = async () => {
  const res = await axiosInstance.get<{
    message: string;
    data: {
      name: string;
      link: string;
      avatar: string;
      description: string;
      category: string;
    }[];
  }>("/friends");

  return res.data.data;
};
