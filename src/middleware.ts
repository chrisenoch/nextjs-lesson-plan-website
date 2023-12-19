import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./models/types/UserRole";
import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { session } from "./session/session";
import { access } from "fs";

let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware ran: " + ++count);
  const originalPath = request.nextUrl.pathname;

  console.log("originalPath " + originalPath);
  if (originalPath.includes("/remove-me")) {
    const index = originalPath.indexOf("/remove-me");
    const newRelativeUrl = originalPath.substring(0, index);
    console.log("new relative url");
    console.log(newRelativeUrl);

    if (
      originalPath.includes("jobs") ||
      originalPath.includes("lessonplans") ||
      originalPath.includes("premium")
    ) {
      console.log("in middleware if");
      const authCookie = request.cookies.get("jwt");
      if (authCookie) {
        const accessToken = authCookie.value;
        console.log("access token below: ");
        console.log(accessToken);
        if (accessToken) {
          //verify token
          try {
            const { payload } = await jose.jwtVerify(
              accessToken,
              new TextEncoder().encode("my-secret")
            );
            console.log("payload from middleware below: " + count);
            console.log(payload);
            //If get to here, token has passed validation
            return NextResponse.redirect(new URL(newRelativeUrl, request.url));
          } catch {
            //token fails verification
            return NextResponse.redirect(new URL("/", request.url));
          }
        }
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  }
  //const resp = NextResponse.next();
  //const resp = NextResponse.redirect(`${request.url}?foo=${count}`);
  //revalidatePath("/lessonplans");

  // console.log("in middleware count " + ++count);
  // console.log("randomId below");
  // console.log(uuidv4());
  // console.log("print referrer header");
  // console.log(request.headers);

  let resp;
  resp = NextResponse.next();
  //resp = NextResponse.redirect(new URL("/auth/test-links", request.url));
  //resp = NextResponse.redirect(new URL("/auth/test-links", request.url));
  // if (request.headers.get("foo")) {
  //   console.log("foo header received, so return normal response");
  //   resp = NextResponse.next();
  // } else {
  //   console.log("foo header not received so redirect to test-link");
  //   resp = NextResponse.redirect(new URL("/auth/test-links", request.url));
  // }

  return resp;

  // const accessToken = request.cookies.get("jwt")?.value;

  // if (accessToken) {
  //   console.log("access token is " + accessToken);
  // } else {
  //   console.log("no access token");
  // }

  // if (request.nextUrl.pathname.startsWith("/lessonplans")) {
  //   console.log("in starts with check " + ++count);
  //   const isAuthenticatedPromise = checkPermissions("ADMIN", accessToken);
  //   const isAuthenticated = await isAuthenticatedPromise;
  //   if (isAuthenticated) {
  //     console.log("is authenticated");
  //     const response = NextResponse.next();

  //     console.log("NextJS headers response in AUTH");
  //     console.log(response.headers);
  //     console.log("NextJS headers request in AUTH");
  //     console.log(request.headers);

  //     response.headers.set("x-middleware-cache", "no-cache");
  //     //return NextResponse.rewrite(new URL("/lessonplans", request.url));
  //     return response;
  //   } else {
  //     console.log("is NOT authenticated");
  //     //return NextResponse.redirect(new URL("/jobs", request.url));

  //     const response = NextResponse.redirect("http://localhost:3000/jobs");

  //     console.log("NextJS headers response in not auth");
  //     console.log(response.headers);
  //     console.log("NextJS headers request in not auth");
  //     console.log(request.headers);
  //     response.headers.set("x-middleware-cache", "no-cache");
  //     return response;
  //   }
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!auth/|lessonplans).*)",
//   ],
// };

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
