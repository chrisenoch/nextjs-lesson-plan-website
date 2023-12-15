import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

//To do
//CSRF protection with double-submit cookie method.
//Query database to check if regresh token has been revoked.
//Cors
//Content Security Policy
//Add a separate authentication server?
//Research other threats.

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside refresh get route handler");
  const accessToken = request.cookies.get("jwt");
  const refreshToken = request.cookies.get("jwt-refresh");

  let resp;
  if (accessToken && refreshToken) {
    try {
      // In this app, we want the user to be able to leave the website and come back to a logged-in session. Consequently, the accessToken can be expired here.
      // Alternatively, to ensure the user is logged out when the user navigates away, we could use the verify method here to ensure
      // an acive access token is needed to get a new access token.
      // The old access token is still needed to ensure that the correct refresh token is associated with the correct user.
      const { payload: oldAccessTokenPayload } = await jose.jwtVerify(
        accessToken.value,
        new TextEncoder().encode("my-secret"),
        { clockTolerance: 604_800 } // 604_800 seconds = 1 week.
      );

      const { payload: refreshTokenPayload } = await jose.jwtVerify(
        refreshToken.value,
        new TextEncoder().encode("another-secret")
      );
      console.log("after verifies both refresh and access");

      //Should stop User A's refresh token being used to get a new access token for User B.
      if (oldAccessTokenPayload.id !== refreshTokenPayload.id) {
        resp = NextResponse.json(
          { message: "Invalid jwt token.", isLoggedIn: false },
          { status: 401 }
        );
      }

      //erase iat and exp properties from the object
      const { iat, exp, ...rest } = oldAccessTokenPayload;
      const newAccessTokenPromise = new jose.SignJWT({ ...rest })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(Math.floor(Date.now() / 1000) + 60 * 1) // 1 minute
        .setIssuedAt()
        .sign(new TextEncoder().encode("my-secret"));

      const newAccessToken = await newAccessTokenPromise;

      const { payload: jwtAccessTokenPayload } = await jose.jwtVerify(
        newAccessToken,
        new TextEncoder().encode("my-secret")
      );

      resp = NextResponse.json({
        ...jwtAccessTokenPayload,
        isLoggedIn: true,
      });
      resp.cookies.delete("jwt");
      resp.cookies.set("jwt", newAccessToken, {
        maxAge: 60 * 60 * 24, //To do: Reduce this number?
        httpOnly: true,
        sameSite: "strict",
      });
    } catch {
      console.log("in catch refresh endpoint");
      resp = NextResponse.json(
        { message: "Invalid jwt token.", isLoggedIn: false }, //To do: Change this error message
        { status: 401 }
      );
    }
  } else {
    resp = NextResponse.json(
      { message: "Missing jwt token.", isLoggedIn: false },
      { status: 200 }
    );
  }

  return resp;
}
