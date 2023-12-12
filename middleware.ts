import { NextRequest, NextResponse } from "next/server";
import { forbidden, serverError } from "./lib/backend";

export async function middleware(request: NextRequest) {
  try {
    const referer = request.headers.get("Referer");

    if (!referer || !referer.startsWith("https://blog.zengjunyin.com")) {
      return forbidden();
    }

    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return serverError();
  }
}

export const config = {
  matcher: ["/api/(.*)"],
};
