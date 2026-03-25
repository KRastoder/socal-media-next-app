import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    if (session?.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/create-post")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  if (pathname.startsWith("/my-posts")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-post", "/signin", "/signup", "/my-posts"],
};
