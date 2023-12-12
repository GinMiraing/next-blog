import {
  badRequest,
  createComment,
  forbidden,
  getCommentsByPath,
} from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateCommentDto = z.object({
  nick: z.string().min(1),
  email: z.string().email(),
  link: z.union([z.string().url(), z.string().length(0)]),
  content: z.string().min(1),
  path: z.string().startsWith("/"),
});

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const path = searchParams.get("path");

  if (!path) {
    return badRequest();
  }

  const data = await getCommentsByPath(path);

  return new NextResponse(
    JSON.stringify({
      message: "get comments success",
      data: data.map((comment) => ({
        id: comment._id,
        nick: comment.nick,
        emailMd5: comment.email_md5,
        link: comment.link,
        content: comment.content,
        isAdmin: comment.is_admin,
        isHidden: comment.is_hidden,
        reply: comment.reply,
      })),
      isError: false,
    }),
    {
      status: 200,
    },
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
    path: string;
  } = await request.json();

  const { success } = CreateCommentDto.safeParse(data);

  if (!success) {
    return badRequest();
  }

  console.log(data);

  // await createComment(data, authKey);

  return new NextResponse(
    JSON.stringify({
      message: "create comment success",
      data: null,
      isError: false,
    }),
  );
}
