import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { joseVerifyToken } from "@/server-only/auth/check-permissions";
import { authTimeHelper } from "@/server-only/auth/auth-time-helper";

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;
/**
 * Important information
 * - Return the same error code in every case and geenric error messages so we don't give attackers any help.
 * @todo
 * - secure flag to cookies
 * - CSRF protection with double-submit cookie method.
 * - Query database to check if refresh token has been revoked.
 * - Cors
 * - Content Security Policy
 * - Add a separate authentication server?
 * - Research other threats.
 * @param request
 */
export async function GET(request: NextRequest) {
  console.log("inside refresh get route handler");
  const accessToken = request.cookies.get(
    process.env.ACCESS_TOKEN_COOKIE_NAME!
  );
  const refreshToken = request.cookies.get(
    process.env.REFRESH_TOKEN_COOKIE_NAME!
  );
  console.log("time");
  const time = new Date();
  console.log(time.toLocaleString());
  console.log("accessToken " + accessToken);

  let resp;
  if (accessToken && refreshToken) {
    try {
      //Prepare the expiry times
      let { jwtTime: proposedAccessTokenExpiry } = authTimeHelper({
        minutes: parseInt(process.env.ACCESS_TOKEN_MINS!),
      });

      const { seconds: oldAccessTokenClockToleranceAndCookieExpiry } =
        authTimeHelper({
          minutes: parseInt(process.env.REFRESH_TOKEN_MINS!),
        });

      // In this app, we want the user to be able to leave the website and come back to a logged-in session. Consequently, the accessToken can be expired here
      // The old access token is still needed to ensure that the correct refresh token is associated with the correct user. Alternatively, to ensure the
      // user is logged out when the user leaves the website, we could use the verify method here without clock tolerance to ensure an active access token
      // is needed to get a new access token. In this case, with an access token of 5 minutes, if the user left the website for less than 5 minutes and
      // then came back again, the user would remain logged-in.
      const { payload: oldAccessTokenPayload } = await jose.jwtVerify(
        accessToken.value,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!),
        { clockTolerance: oldAccessTokenClockToleranceAndCookieExpiry }
      );

      const { payload: refreshTokenPayload } = await joseVerifyToken(
        refreshToken.value,
        process.env.REFRESH_TOKEN_SECRET!
      );

      //Should stop User A's refresh token being used to get a new access token for User B.
      if (oldAccessTokenPayload.id !== refreshTokenPayload.id) {
        resp = NextResponse.json(
          { message: "Refresh failure.", isError: true },
          { status: 401 }
        );
      }

      //erase iat and exp properties from the object
      const { iat, exp, ...newAccessTokenPayload } = oldAccessTokenPayload;

      let wasLastRefresh = false;
      let accessTokenExpiry;
      /*
      Towards the end of the life of the refresh token, the proposedAccessTokenExpiry will have an expiry further in the
      future than the refresh token expiry.
      */
      if (
        refreshTokenPayload?.exp &&
        refreshTokenPayload.exp <= proposedAccessTokenExpiry
      ) {
        /*
        To do: update the access token cookie to reflect this change. At the moment the life of the cookie
        is based on the proposedAccessTokenExpiry, and will hold an expired token for this time.
        */
        accessTokenExpiry = refreshTokenPayload.exp;
        wasLastRefresh = true;
      } else {
        accessTokenExpiry = proposedAccessTokenExpiry;
      }

      const newAccessToken = await new jose.SignJWT({
        ...newAccessTokenPayload,
      })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(accessTokenExpiry)
        .setIssuedAt()
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));

      const { payload: jwtAccessTokenPayload } = await joseVerifyToken(
        newAccessToken,
        process.env.ACCESS_TOKEN_SECRET!
      );

      console.log("refresh success and jwtAccessTokenPayload below");
      console.log(jwtAccessTokenPayload);

      resp = NextResponse.json(
        {
          ...jwtAccessTokenPayload,
          wasLastRefresh,
          message: "Refresh success.",
          isError: false,
        },
        { status: 200 }
      );
      resp.cookies.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
      resp.cookies.set(process.env.ACCESS_TOKEN_COOKIE_NAME!, newAccessToken, {
        maxAge: oldAccessTokenClockToleranceAndCookieExpiry,
        httpOnly: true,
        sameSite: "strict",
      });
    } catch {
      //Invalid jwt token.
      console.log("in catch refresh endpoint");
      resp = NextResponse.json(
        { message: "Refresh failure", isError: true }, //To do: Change this error message
        { status: 401 }
      );
    }
  } else {
    //Missing jwt token.
    console.log("missing JWT token");
    resp = NextResponse.json(
      { message: "Refresh failure", isError: true },
      { status: 401 }
    );
  }

  return resp;
}
