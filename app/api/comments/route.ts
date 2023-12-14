import { badRequest, createComment, forbidden } from "@/lib/backend";
import connectDB from "@/lib/mongodb/connect";
import Comment from "@/lib/mongodb/schema/comment";
import { CommentRaw } from "@/lib/mongodb/type";
import RedisClient from "@/lib/redis/connect";
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
  try {
    const { searchParams } = new URL(request.url);

    const path = searchParams.get("path");

    if (!path) {
      return badRequest();
    }

    const cachedComments = await RedisClient.get(`comments:${path}`);

    if (cachedComments) {
      return NextResponse.json(JSON.parse(cachedComments));
    }

    await connectDB();
    const data: CommentRaw[] = await Comment.find({
      path,
    })
      .select([
        "_id",
        "nick",
        "email_md5",
        "link",
        "content",
        "is_admin",
        "is_hidden",
        "reply",
      ])
      .sort({
        _id: -1,
      })
      .exec();

    await RedisClient.set(
      `comments:${path}`,
      JSON.stringify({
        message: "get comments success",
        data,
        isError: false,
      }),
    );

    return NextResponse.json({
      message: "get comments success",
      data,
      isError: false,
    });
  } catch (e) {
    return new NextResponse(
      JSON.stringify({
        message: "get comments failed",
        data: null,
        isError: true,
      }),
      { status: 500 },
    );
  }
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

  await createComment(data, authKey);

  return new NextResponse(
    JSON.stringify({
      message: "create comment success",
      data: null,
      isError: false,
    }),
  );
}
