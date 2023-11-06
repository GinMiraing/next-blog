import { authKey } from "@/lib/auth";
import { CommentSchema, FormatedComment } from "@/lib/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export async function GET(req: NextRequest) {
  const authorization = authKey(req);

  if (!authorization) {
    return new NextResponse(
      JSON.stringify({ message: "认证失败", code: 401 }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const path = req.headers.get("path");

  if (!path) {
    return new NextResponse(
      JSON.stringify({ message: "请求参数错误", code: 400 }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const res = await axiosInstance.get<CommentSchema[]>("/comments", {
      params: {
        path,
      },
    });

    const data: FormatedComment[] = res.data.map((item) => ({
      id: item._id,
      nick: item.nick,
      emailMd5: item.email_md5,
      content: item.content,
      link: item.link,
      isAdmin: item.is_admin,
      isHidden: item.is_hidden,
      reply: item.reply,
    }));

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "服务器错误", code: 500 }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function POST(req: NextRequest) {
  const authorization = authKey(req);

  console.log(req);

  if (!authorization) {
    return new NextResponse(
      JSON.stringify({ message: "认证失败", code: 401 }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    await req.json();
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "请求参数错误", code: 400 }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const data = (await req.json()) as {
    nick: string;
    email: string;
    link: string;
    content: string;
    path: string;
  };

  console.log();

  return NextResponse.json({ message: "评论成功", code: 200 });
}
