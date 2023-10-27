import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const data: { theme: string } = await req.json();
  const { theme } = data;

  cookies().set("theme", theme, { maxAge: 60 * 60 * 24 * 30 });
  return NextResponse.json({ data: theme });
}
