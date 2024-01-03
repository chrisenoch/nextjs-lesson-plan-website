import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { joseVerifyToken } from "@/functions/auth/check-permissions";
import { authTimeHelper } from "@/functions/auth/auth-time-helper";
import { ACCESS_TOKEN_MINS, REFRESH_TOKEN_MINS } from "@/auth-config";

// To do
// CSRF protection with double-submit cookie method.
// Query database to check if refresh token has been revoked.
// Cors
// Content Security Policy
// Add a separate authentication server?
// secure flag to cookies
// Research other threats.

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside refresh get route handler");
  const accessToken = request.cookies.get(
    process.env.ACCESS_TOKEN_COOKIE_NAME!
  );
  const refreshToken = request.cookies.get(
    process.env.REFRESH_TOKEN_COOKIE_NAME!
  );

  let resp;
  if (accessToken && refreshToken) {
    try {
      //Prepare the expiry times
      const { jwtTime: accessTokenExpiry, seconds: accessTokenCookieExpiry } =
        authTimeHelper({ minutes: ACCESS_TOKEN_MINS });

      const { seconds: oldAccessTokenClockTolerance } = authTimeHelper({
        minutes: REFRESH_TOKEN_MINS,
      });

      // In this app, we want the user to be able to leave the website and come back to a logged-in session. Consequently, the accessToken can be expired here.
      // Alternatively, to ensure the user is logged out when the user navigates away, we could use the verify method here to ensure
      // an active access token is needed to get a new access token.
      // The old access token is still needed to ensure that the correct refresh token is associated with the correct user.
      const { payload: oldAccessTokenPayload } = await jose.jwtVerify(
        accessToken.value,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!),
        { clockTolerance: oldAccessTokenClockTolerance }
      );

      const { payload: refreshTokenPayload } = await joseVerifyToken(
        refreshToken.value,
        process.env.REFRESH_TOKEN_SECRET!
      );

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
        .setExpirationTime(accessTokenExpiry)
        .setIssuedAt()
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));

      const newAccessToken = await newAccessTokenPromise;

      const { payload: jwtAccessTokenPayload } = await joseVerifyToken(
        newAccessToken,
        process.env.ACCESS_TOKEN_SECRET!
      );

      resp = NextResponse.json({
        ...jwtAccessTokenPayload,
        isLoggedIn: true,
      });
      resp.cookies.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
      resp.cookies.set(process.env.ACCESS_TOKEN_COOKIE_NAME!, newAccessToken, {
        maxAge: accessTokenCookieExpiry,
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
