import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/models/types/UserRole";
import { joseVerifyToken } from "@/functions/auth/check-permissions";
import { authTimeHelper } from "@/functions/auth/auth-time-helper";
import { ACCESS_TOKEN_MINS, REFRESH_TOKEN_MINS } from "@/auth-config";
//To do: change the userId to something that is harder to guess.

export async function POST(request: Request) {
  revalidatePath("/");

  const res: { email: string; password: string } = await request.json();
  const iat = Math.floor(Date.now() / 1000);
  let accessToken;
  let accessTokenPromise;
  let refreshToken;
  let refreshTokenPromise;
  let userDetailsPayload: {
    id: string; //Because query params are strings. This makes equality checks easier.
    firstName: string;
    email: string;
    role: UserRole;
  } | null = null;
  let jwtAccessTokenPayload;
  let nextResponse;

  //Prepare the expiry times
  const { jwtTime: accessTokenExpiry, seconds: accessTokenCookieExpiry } =
    authTimeHelper({ minutes: ACCESS_TOKEN_MINS });
  const { jwtTime: refreshTokenExpiry, seconds: refreshTokenCookieExpiry } =
    authTimeHelper({ minutes: REFRESH_TOKEN_MINS });

  //In reality would do a database lookup here.
  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Prepare jwt access token
    userDetailsPayload = {
      id: "1",
      firstName: "Chris",
      email: "foo@bar.com",
      role: "USER",
    };

    accessTokenPromise = new jose.SignJWT({ ...userDetailsPayload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(accessTokenExpiry)
      .setIssuedAt()
      .sign(new TextEncoder().encode("my-secret"));

    accessToken = await accessTokenPromise;
    const { payload } = await joseVerifyToken(accessToken, "my-secret");

    jwtAccessTokenPayload = payload;

    //Prepare jwt refresh token
    refreshTokenPromise = new jose.SignJWT({ ...userDetailsPayload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(refreshTokenExpiry)
      .setIssuedAt()
      .sign(new TextEncoder().encode("another-secret"));

    refreshToken = await refreshTokenPromise;
  }

  //set cookie
  if (accessToken && refreshToken && userDetailsPayload) {
    nextResponse = NextResponse.json(
      {
        ...userDetailsPayload,
        iat: jwtAccessTokenPayload!.iat,
        exp: jwtAccessTokenPayload!.exp,
        isLoggedIn: true,
      },
      { status: 200 }
    );
    nextResponse.cookies.set("jwt", accessToken, {
      maxAge: accessTokenCookieExpiry,
      httpOnly: true,
      sameSite: "strict",
    });
    nextResponse.cookies.set("jwt-refresh", refreshToken, {
      maxAge: refreshTokenCookieExpiry,
      httpOnly: true,
      sameSite: "strict",
      path: "/api/auth/with-refresh", //Set the path so that the refresh token is not sent with every request. This reduces the possibility of it being stolen.
    });
    return nextResponse;
  } else {
    nextResponse = NextResponse.json(
      { error: "Unsuccessful login", isLoggedIn: false },
      { status: 401 }
    );
    return nextResponse;
  }
}
