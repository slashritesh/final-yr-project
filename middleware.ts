import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(req: Request) {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
