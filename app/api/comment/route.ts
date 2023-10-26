import { connect } from "@/lib/mongodb";

import { NextRequest, NextResponse } from "next/server";

import MD5 from "crypto-js/md5";
import CommentModel from "@/lib/models/comment";
import dayjs from "dayjs";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const parentId = parseInt(searchParams.get("parentId") || "0");

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
      parent_id: number;
      reply_id: number;
      reply_nick: string;
      format_time: string;
      path: string;
    }[] = await CommentModel.find({
      parent_id: parentId,
    }).sort({ _id: parentId === 0 ? -1 : 1 });

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
          parentId: comment.parent_id,
          replyId: comment.reply_id,
          replyNick: comment.reply_nick,
          formatTime: comment.format_time,
          path: comment.path,
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
    parentId: number;
    replyId: number;
    replyNick: string;
    path: string;
  } = await req.json();

  const { nick, email, link, content, parentId, replyId, replyNick, path } =
    data;

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
      parent_id: number;
      reply_id: number;
      reply_nick: string;
      format_time: string;
      path: string;
    } = await CommentModel.create({
      _id: nowTime,
      nick,
      email,
      email_md5: emailMd5,
      link,
      content,
      is_admin: adminAuth ? true : false,
      is_hidden: false,
      parent_id: parentId,
      reply_id: replyId,
      reply_nick: replyNick,
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
        parentId: comment.parent_id,
        replyId: comment.reply_id,
        replyNick: comment.reply_nick,
        formatTime: comment.format_time,
        path: comment.path,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Create comment failed", { status: 500 });
  }
}
