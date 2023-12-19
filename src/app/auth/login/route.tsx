import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
//To do: change the userId to something that is harder to guess.

export async function POST(request: Request) {
  revalidatePath("/");

  const res: { email: string; password: string } = await request.json();
  const iat = Math.floor(Date.now() / 1000);
  let accessToken;
  let accessTokenPromise;
  let refreshToken;
  let refreshTokenPromise;
  let userDetailsPayload;
  let jwtAccessTokenPayload;
  let nextResponse;

  let accessTokenExp;
  let refreshTokenExp;

  //In reality would do a database lookup here.
  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Prepare the expiry times
    accessTokenExp = iat + 60 * 1; // 1 minute
    refreshTokenExp = iat + 60 * 2; // 2 mins

    //Prepare jwt access token
    userDetailsPayload = {
      id: 0,
      firstName: "Chris",
      email: "foo@bar.com",
      role: "ADMIN",
    };

    accessTokenPromise = new jose.SignJWT({ ...userDetailsPayload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(accessTokenExp)
      .setIssuedAt()
      .sign(new TextEncoder().encode("my-secret"));

    accessToken = await accessTokenPromise;

    const { payload } = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode("my-secret")
    );
    jwtAccessTokenPayload = payload;

    // accessToken = jwt.sign(userDetailsPayload, "my-secret", {
    //   expiresIn: "5m",
    // }); //returns the token
    // jwtAccessTokenPayload = jwt.verify(accessToken, "my-secret") as JwtPayload;

    //Prepare jwt refresh token
    refreshTokenPromise = new jose.SignJWT({ ...userDetailsPayload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(refreshTokenExp)
      .setIssuedAt()
      .sign(new TextEncoder().encode("another-secret"));

    refreshToken = await refreshTokenPromise;

    // refreshToken = jwt.sign(userDetailsPayload, "another-secret", {
    //   expiresIn: "10m",
    // }); //returns the token
  }

  //set cookie
  if (accessToken && refreshToken) {
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
      maxAge: 60 * 60 * 24, //To do: Reduce this number?
      httpOnly: true,
      sameSite: "strict",
    });
    nextResponse.cookies.set("jwt-refresh", refreshToken, {
      maxAge: 60 * 60 * 24, //To do: Reduce this number?
      httpOnly: true,
      sameSite: "strict",
      path: "/auth/with-refresh", //Set the path so that the refresh token is not sent with every request. This reduces the possibility of it being stolen.
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
