import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkPermissions } from "./functions/auth/check-permissions";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

export function middleware(request: NextRequest) {
  // console.log("middleware ran and cookies below");
  // console.log(request.cookies.getAll());
  const response = NextResponse.next();

  //   if (request.nextUrl.pathname.startsWith("/lessonplans")) {
  //     console.log("jose below");
  //     console.log(jose);

  // async function testJose() {
  //   try {
  //     const iat = Math.floor(Date.now() / 1000);
  //     const exp = iat + 60 * 1; // one minute

  //     const payload = {
  //       id: 0,
  //       name: "Chris",
  //       foo: "bar",
  //       age: 39,
  //     };

  //     const tokenPromise = new jose.SignJWT({ ...payload })
  //       .setProtectedHeader({ alg: "HS256", typ: "JWT" })
  //       .setExpirationTime(exp)
  //       .setIssuedAt()
  //       .setNotBefore(iat)
  //       .sign(new TextEncoder().encode("jose-secret"));

  //     // const token = await tokenPromise;
  //     // console.log("jose-secret token below");
  //     // console.log(token);

  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibmFtZSI6IkNocmlzIiwiZm9vIjoiYmFyIiwiYWdlIjozOSwiZXhwIjoxNzAyNjc4Njg2LCJpYXQiOjE3MDI2Nzg2MjYsIm5iZiI6MTcwMjY3ODYyNn0.bTVJperooEt1AU6a_z9XbXE6V2YfM8UtawhNtk3-p1g";

  //     console.log("trying with old token");
  //     console.log(token);
  //     console.log("typeof token");
  //     console.log(typeof token);

  //     const { payload: receivedPayload } = await jose.jwtVerify(
  //       token,
  //       new TextEncoder().encode("jose-secret"),
  //       { clockTolerance: 604_800 }
  //     );
  //     console.log("received payload below");
  //     console.log(receivedPayload);

  //     console.log("decoding claims");
  //     const claims = jose.decodeJwt(token);
  //     console.log(claims);
  //   } catch {
  //     console.log("catch jose entered");
  //   }
  // }

  // testJose();
  return response;
}
