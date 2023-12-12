import { getAuthKey } from "@/lib/backend";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const signature = await getAuthKey();

  return new NextResponse(
    JSON.stringify({
      message: "get auth key success",
      data: signature,
      isError: false,
    }),
    { status: 200 },
  );
}
