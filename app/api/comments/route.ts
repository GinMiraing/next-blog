import {
  badRequest,
  checkAuthKey,
  createComment,
  deleteAuthKey,
  forbidden,
  getCommentsByPath,
  serverError,
} from "@/lib/backend";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ReplyDto = z.object({
  nick: z.string().min(1),
  email: z.string().email(),
  link: z.union([z.string().url(), z.string().length(0)]),
  content: z.string().min(1),
  parentId: z.number(),
  replyId: z.number(),
  replyNick: z.string().min(1),
});

const CommentDto = z.object({
  nick: z.string().min(1),
  email: z.string().email(),
  link: z.union([z.string().url(), z.string().length(0)]),
  content: z.string().min(1),
  path: z.string().startsWith("/"),
});

export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const path = searchParams.get("path");

    if (!path) {
      return badRequest();
    }

    const comments = await getCommentsByPath(path);

    return NextResponse.json({
      message: "get comments success",
      data: comments.map((comment) => ({
        id: comment.id,
        nick: comment.nick,
        emailMd5: comment.email_md5,
        link: comment.link,
        content: comment.content,
        isAdmin: comment.is_admin,
        timestamp: Number(comment.timestamp),
        replyCount: comment.reply_count,
        replyList: comment.reply_list.map((reply) => ({
          id: reply.id,
          nick: reply.nick,
          emailMd5: reply.email_md5,
          link: reply.link,
          content: reply.content,
          isAdmin: reply.is_admin,
          timestamp: Number(reply.timestamp),
          replyId: reply.reply_id,
          replyNick: reply.reply_nick,
        })),
      })),
      isError: false,
    });
  } catch (e) {
    console.log(e);

    return serverError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: {
      isReply: boolean;
      nick: string;
      email: string;
      content: string;
      path: string;
      link?: string;
      parentId?: number;
      replyId?: number;
      replyNick?: string;
      authKey?: string;
    } = await request.json();

    if (!data.authKey) {
      return forbidden();
    }

    const isAuthKeyValid = await checkAuthKey(data.authKey);

    if (!isAuthKeyValid) {
      return forbidden();
    }

    if (data.isReply) {
      const { success } = ReplyDto.safeParse(data);
      if (!success) {
        return badRequest();
      }
    } else {
      const { success } = CommentDto.safeParse(data);
      if (!success) {
        return badRequest();
      }
    }

    await createComment({
      is_reply: data.isReply,
      nick: data.nick,
      email: data.email,
      content: data.content,
      path: data.path,
      link: data.link,
      parent_id: data.parentId,
      reply_id: data.replyId,
      reply_nick: data.replyNick,
    });

    await deleteAuthKey(data.authKey);

    return new NextResponse(
      JSON.stringify({
        message: "create comment success",
        data: "create comment success",
        isError: false,
      }),
    );
  } catch (e) {
    console.log(e);

    return serverError();
  }
}
