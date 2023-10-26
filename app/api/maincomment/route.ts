import { connect } from "@/lib/mongodb";

import { NextRequest, NextResponse } from "next/server";

import MD5 from "crypto-js/md5";
import MainCommentModel from "@/lib/models/MainComment";
import dayjs from "dayjs";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const path = searchParams.get("path") || "";

  try {
    await connect();

    const comments: {
      _id: number;
      nick: string;
      email: string;
      email_md5: string;
      link: string;
      content: string;
      is_admin: boolean;
      is_hidden: boolean;
      format_time: string;
      path: string;
      relpy: number;
    }[] = await MainCommentModel.find({
      path,
    });

    return NextResponse.json({
      data: comments.map((comment) => {
        return {
          id: comment._id,
          nick: comment.nick,
          email: comment.email,
          emailMd5: comment.email_md5,
          link: comment.link,
          content: comment.content,
          isAdmin: comment.is_admin,
          isHidden: comment.is_hidden,
          formatTime: comment.format_time,
          path: comment.path,
          reply: comment.relpy,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Get comment failed", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data: {
    nick: string;
    email: string;
    link: string;
    content: String;
    path: string;
  } = await req.json();

  const { nick, email, link, content, path } = data;

  const emailMd5 = MD5(email).toString();

  const nowTime = Date.now();
  const formatTime = dayjs(nowTime).format("YYYY-MM-DD HH:mm:ss");

  const adminAuth = link === "GinMiraing";

  try {
    await connect();

    const comment: {
      _id: number;
      nick: string;
      email: string;
      email_md5: string;
      link: string;
      content: string;
      is_admin: boolean;
      is_hidden: boolean;
      format_time: string;
      path: string;
      reply: number;
    } = await MainCommentModel.create({
      _id: nowTime,
      nick,
      email,
      email_md5: emailMd5,
      link,
      content,
      is_admin: adminAuth ? true : false,
      is_hidden: false,
      format_time: formatTime,
      path,
    });
    return NextResponse.json({
      data: {
        id: comment._id,
        nick: comment.nick,
        email: comment.email,
        emailMd5: comment.email_md5,
        link: comment.link,
        content: comment.content,
        isAdmin: comment.is_admin,
        isHidden: comment.is_hidden,
        formatTime: comment.format_time,
        path: comment.path,
        reply: comment.reply,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Create comment failed", { status: 500 });
  }
}
