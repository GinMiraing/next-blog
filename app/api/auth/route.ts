import { SHA256 } from "crypto-js";
import { NextResponse } from "next/server";

export async function GET() {
  const timestamp = Date.now();
  const secretKey = process.env.SECRET_KEY || "secretkey";

  const token = SHA256(`${timestamp}${secretKey}`).toString();

  const signature = btoa(JSON.stringify({ timestamp, token }));

  return NextResponse.json({
    signature,
  });
}
