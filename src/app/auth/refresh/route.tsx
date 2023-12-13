import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside refresh get route handler");

  const accessToken = request.cookies.get("jwt");
  const refreshToken = request.cookies.get("jwt-refresh");

  let resp;
  if (accessToken && refreshToken) {
    //The access token must also still be valid. So if somebody steals only the refresh token, this is not enough to get access.
    try {
      const oldAccessTokenPayload = jwt.verify(
        accessToken.value,
        "my-secret"
      ) as JwtPayload;
      const refreshTokenPayload = jwt.verify(
        refreshToken.value,
        "another-secret"
      ) as JwtPayload;

      console.log("after verifies");

      //Should stop User A's refresh token being used to get a new access token for User B.
      if (oldAccessTokenPayload.id !== refreshTokenPayload.id) {
        resp = NextResponse.json(
          { message: "Invalid jwt token.", isLoggedIn: false },
          { status: 401 }
        );
      }

      //erase iat and exp properties from the object
      const { iat, exp, ...rest } = oldAccessTokenPayload;
      const newAccessToken = jwt.sign(rest, "my-secret", {
        expiresIn: "3m",
      });

      //delete this - just for testing
      const jwtAccessTokenPayload = jwt.verify(
        newAccessToken,
        "my-secret"
      ) as JwtPayload;

      resp = NextResponse.json(jwtAccessTokenPayload);
      resp.cookies.delete("jwt");
      resp.cookies.set("jwt", newAccessToken, {
        maxAge: 60 * 60 * 24, //To do: Reduce this number?
        httpOnly: true,
        sameSite: "strict",
      });
    } catch {
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
