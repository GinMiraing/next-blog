import { connect } from "@/lib/mongodb";

import { NextRequest, NextResponse } from "next/server";

import MD5 from "crypto-js/md5";
import ReplyCommentModel from "@/lib/models/ReplyComment";
import MainCommentModel from "@/lib/models/MainComment";
import dayjs from "dayjs";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const parentId = searchParams.get("parentId");
  const path = searchParams.get("path");

  if (!parentId) {
    return new NextResponse("Get comment failed", { status: 500 });
  }

  if (!path) {
    return new NextResponse("Get comment failed", { status: 500 });
  }

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
      parent_id: number;
      reply_id: number;
      reply_nick: string;
    }[] = await ReplyCommentModel.find({
      parent_id: parentId,
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
          parentId: comment.parent_id,
          replyId: comment.reply_id,
          replyNick: comment.reply_nick,
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
    parentId: number;
    replyId: number;
    replyNick: string;
  } = await req.json();

  const { nick, email, link, content, path, parentId, replyId, replyNick } =
    data;

  const emailMd5 = MD5(email).toString();

  const nowTime = Date.now();
  const formatTime = dayjs(nowTime).format("YYYY-MM-DD HH:mm:ss");

  const adminAuth = link === "GinMiraing";

  try {
    await connect();

    await MainCommentModel.findOneAndUpdate(
      {
        _id: parentId,
      },
      {
        $inc: {
          relpy: 1,
        },
      },
    );

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
      parent_id: number;
      reply_id: number;
      reply_nick: string;
    } = await ReplyCommentModel.create({
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
      parent_id: parentId,
      reply_id: replyId,
      reply_nick: replyNick,
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
        parentId: comment.parent_id,
        replyId: comment.reply_id,
        replyNick: comment.reply_nick,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Create comment failed", { status: 500 });
  }
}
