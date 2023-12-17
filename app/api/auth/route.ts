import { generateAuthKey, serverError } from "@/lib/backend";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const authKey = await generateAuthKey();

    return NextResponse.json({
      message: "get auth key success",
      data: authKey,
      isError: false,
    });
  } catch (e) {
    console.log(e);
    return serverError();
  }
}
