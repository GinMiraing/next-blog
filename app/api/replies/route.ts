import { badRequest, getRepliesByParentId } from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {}
