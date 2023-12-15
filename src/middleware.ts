import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkPermissions } from "./functions/auth/check-permissions";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

export function middleware(request: NextRequest) {
  console.log("middleware ran and cookies below");
  console.log(request.cookies.getAll());
  const response = NextResponse.next();
  //   if (request.nextUrl.pathname.startsWith("/lessonplans")) {
  //     console.log("jose below");
  //     console.log(jose);

  //   async function testJose() {
  //     try {
  //       const iat = Math.floor(Date.now() / 1000);
  //       const exp = iat + 60 * 60; // one hour

  //       const payload = {
  //         id: 0,
  //         name: "Chris",
  //         foo: "bar",
  //         age: 39,
  //       };

  //       const tokenPromise = new jose.SignJWT({ ...payload })
  //         .setProtectedHeader({ alg: "HS256", typ: "JWT" })
  //         .setExpirationTime(exp)
  //         .setIssuedAt(iat)
  //         .setNotBefore(iat)
  //         .sign(new TextEncoder().encode("jose-secret"));

  //       const token = await tokenPromise;
  //       console.log("what I think is token below:");
  //       console.log(token);

  //       const { payload: receivedPayload } = await jose.jwtVerify(
  //         token,
  //         new TextEncoder().encode("jose-secret")
  //       );
  //       console.log("received payload below");
  //       console.log(receivedPayload);

  //       console.log("decoding claims");
  //       const claims = jose.decodeJwt(token);
  //       console.log(claims);
  //     } catch {
  //       console.log("catch jose entered");
  //     }
  //   }

  //   testJose();
  return response;

  //const accessToken = request.cookies.get("jwt");
  // console.log("access token in mw");
  // console.log(accessToken);

  // console.log("jwt library value");
  // console.log(jwt);

  // if (accessToken) {
  //   try {
  //     //create a new token and imemdiately verify it to see if its working to some degree
  //     let testDetailsPayload = {
  //       id: 10,
  //       firstName: "test",
  //       email: "test@test.com",
  //       role: "ADMIN",
  //     };

  //     const accessTokenTest = jwt.sign(testDetailsPayload, "test-secret", {
  //       expiresIn: "5m",
  //     }); //returns the token

  //     console.log("accessTokentest created");
  //     console.log(accessTokenTest);
  //     let jwtAccessTokenPayload = jwt.verify(
  //       accessTokenTest,
  //       "test-secret"
  //     ) as JwtPayload;
  //     console.log("jwtAccessTokenPayload below ");
  //     console.log(jwtAccessTokenPayload);
  //     console.log("after test verify");

  //     //real code
  //     console.log("before verify");
  //     const accessTokenPayload = jwt.verify(
  //       accessToken.value,
  //       "my-secret"
  //     ) as JwtPayload;
  //     console.log("after verify");

  //     console.log("accessToken payload");
  //     console.log(accessTokenPayload);

  //     console.log("after verify");

  //     const userRole = accessTokenPayload.role;
  //     if (userRole === "ADMIN") {
  //       console.log("successful role check");
  //       return response;
  //     } else {
  //       console.log("failed role check");
  //       return response;
  //     }
  //   } catch {
  //     console.log("in catch in mw");
  //     return response;
  //   }

  //   // if (checkPermissions(request, "ADMIN")) {
  //   //   console.log("permission check passed");
  //   //   return response;
  //   // } else {
  //   //   console.log("permission check failed");
  //   //   return NextResponse.redirect(new URL("/jobs", request.url));
  //   // }
  // }
  //}
}
