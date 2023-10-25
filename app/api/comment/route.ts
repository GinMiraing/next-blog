import { connect } from "@/lib/mongodb";

import { NextRequest, NextResponse } from "next/server";

import MD5 from "crypto-js/md5";
import CommentModel from "@/lib/models/comment";
import dayjs from "dayjs";

export const revalidate = 0;

export async function GET() {
  try {
    await connect();
    const comments = await CommentModel.find();

    return NextResponse.json({
      comments,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse("Get comment failed", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data: {
    username: string;
    email: string;
    link: string;
    content: String;
    reply_to: String;
  } = await req.json();

  const { username, email, link, content, reply_to } = data;

  const email_md5 = MD5(email).toString();
  const is_reply = reply_to.length > 0;
  const created_at = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  const adminAuth = link === "GinMiraing";

  try {
    await connect();

    const comment = await CommentModel.create({
      username,
      email,
      email_md5,
      link,
      content,
      is_admin: adminAuth ? true : false,
      is_hidden: false,
      is_reply,
      reply_to,
      created_at,
    });
    return NextResponse.json({
      comment,
    });
  } catch (error) {
    return new NextResponse("Create comment failed", { status: 500 });
  }
}
