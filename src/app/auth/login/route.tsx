import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { email: string; password: string } = await request.json();
  let accessToken;
  let refreshToken;
  let userDetailsPayload;
  let jwtAccessTokenPayload;
  let jwtRefreshTokenPayload;
  let nextResponse;

  //In reality would do a database lookup here.
  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Prepare jwt access token
    userDetailsPayload = {
      id: 0,
      firstName: "Chris",
      email: "foo@bar.com",
      role: "admin",
    };
    //token = jwt.sign(payload, "my-secret", { expiresIn: "1d" });
    accessToken = jwt.sign(userDetailsPayload, "my-secret", {
      expiresIn: "3m",
    }); //returns the token
    jwtAccessTokenPayload = jwt.verify(accessToken, "my-secret") as JwtPayload;

    //Prepare jwt refresh token
    refreshToken = jwt.sign(userDetailsPayload, "another-secret", {
      expiresIn: "1d",
    }); //returns the token
    jwtRefreshTokenPayload = jwt.verify(
      refreshToken,
      "another-secret"
    ) as JwtPayload;
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
