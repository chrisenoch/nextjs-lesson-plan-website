import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./models/types/UserRole";
import * as jose from "jose";

let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware ran: " + ++count);
  const originalPath = request.nextUrl.pathname;

  if (originalPath.includes("/next-link-wrapper-id")) {
    const index = originalPath.indexOf("/next-link-wrapper-id");
    const newRelativeUrl = originalPath.substring(0, index);
    if (
      originalPath.includes("jobs") ||
      originalPath.includes("lessonplans") ||
      originalPath.includes("premium")
    ) {
      const authCookie = request.cookies.get("jwt");
      if (authCookie) {
        const accessToken = authCookie.value;

        if (accessToken) {
          //verify token
          try {
            const { payload } = await jose.jwtVerify(
              accessToken,
              new TextEncoder().encode("my-secret")
            );

            //token has passed validation
            return NextResponse.redirect(new URL(newRelativeUrl, request.url));
          } catch {
            //token fails verification
            return NextResponse.redirect(new URL("/auth/signin", request.url));
          }
        }
      } else {
        //no token present
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    }

    //not a protected route
    return NextResponse.next();
  }

  //route was not reached via a NextLinkWrapper link component:
  return NextResponse.next();
}

async function checkPermissions(
  role: UserRole,
  accessToken: string | undefined
) {
  console.log("accessToken in c-p");
  console.log(accessToken);
  if (!accessToken) {
    return false;
  }
  if (accessToken) {
    try {
      console.log("in try checkPermissions");
      const { payload: accessTokenPayload } = await jose.jwtVerify(
        accessToken,
        new TextEncoder().encode("my-secret")
      );
      const userRole = accessTokenPayload.role;

      if (userRole === role) {
        console.log("successful role check");
        return true;
      } else {
        console.log("failed role check");
        return false;
      }
    } catch {
      console.log("in catch in check-permissions");
      return false;
    }
  } else {
    return false;
  }
}
