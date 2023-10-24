import { connect, Comment } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    await Comment.create({
      name: "test",
      text: "test",
    });
    return NextResponse.json({
      message: "Connect to MongoDB success",
      code: 200,
    });
  } catch (error) {
    return new NextResponse("Connect to MongoDB failed", { status: 500 });
  }
}
