import {
  badRequest,
  createReply,
  forbidden,
  getRepliesByParentId,
} from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateReplyDto = z.object({
  nick: z.string().min(1),
  email: z.string().email(),
  link: z.union([z.string().url(), z.string().length(0)]),
  content: z.string().min(1),
  parentId: z.number(),
  replyId: z.number(),
});

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get("parentId");

  if (!parentId || isNaN(parseInt(parentId))) {
    return badRequest();
  }

  const data = await getRepliesByParentId(parseInt(parentId));

  return new NextResponse(
    JSON.stringify({
      message: "get replies success",
      data: data.map((reply) => ({
        id: reply._id,
        nick: reply.nick,
        emailMd5: reply.email_md5,
        link: reply.link,
        content: reply.content,
        isAdmin: reply.is_admin,
        isHidden: reply.is_hidden,
        replyId: reply.reply_id,
        replyNick: reply.reply_nick,
      })),
      isError: false,
    }),
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const authKey = request.headers.get("Api-Key");

  if (!authKey) {
    return forbidden();
  }

  const data: {
    nick: string;
    email: string;
    link: string;
    content: string;
    parentId: number;
    replyId: number;
  } = await request.json();

  const { success } = CreateReplyDto.safeParse(data);

  if (!success) {
    return badRequest();
  }

  await createReply(data, authKey);

  return new NextResponse(
    JSON.stringify({
      message: "create reply success",
      data: null,
      isError: false,
    }),
  );
}
