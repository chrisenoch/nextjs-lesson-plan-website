import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./models/types/UserRole";
import * as jose from "jose";

const protectedRoutes = ["/jobs", "/lessonplans", "/premium"];

export async function middleware(request: NextRequest) {
  const originalPath = request.nextUrl.pathname;

  if (originalPath.includes("/next-link-wrapper-id")) {
    const newRelativeUrl = removeSecureNextLinkSuffix(originalPath);

    if (protectedRoutes.includes(newRelativeUrl)) {
      const authCookie = request.cookies.get("jwt");
      if (authCookie) {
        const accessToken = authCookie.value;
        const isAuthenticatedPromise = checkPermissions("ADMIN", accessToken);
        const isAuthenticated = await isAuthenticatedPromise;
        if (isAuthenticated) {
          return NextResponse.redirect(new URL(newRelativeUrl, request.url));
        } else {
          return NextResponse.redirect(new URL("/auth/signin", request.url));
        }
      } else {
        //no auth cookie present
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    }

    //not a protected route
    return NextResponse.redirect(new URL(newRelativeUrl, request.url));
  }

  //route was not reached via a SecureNextLink link component. E.g. The user loaded the page directly or was redirected from a route.tsx
  if (
    protectedRoutes.includes(originalPath) &&
    !originalPath.includes("/next-link-wrapper-id")
  ) {
    const authCookie = request.cookies.get("jwt");
    if (authCookie) {
      const accessToken = authCookie.value;
      const isAuthenticatedPromise = checkPermissions("ADMIN", accessToken);
      const isAuthenticated = await isAuthenticatedPromise;
      if (isAuthenticated) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    } else {
      //no auth cookie present
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  function removeSecureNextLinkSuffix(originalPath: string) {
    const index = originalPath.indexOf("/next-link-wrapper-id");
    const newRelativeUrl = originalPath.substring(0, index);
    return newRelativeUrl;
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
        console.log(
          "in catch in check-permissions: access token verification failed"
        );
        return false;
      }
    } else {
      return false;
    }
  }
}
