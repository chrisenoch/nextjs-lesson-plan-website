import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { email: string; password: string } = await request.json();
  let token;
  let userDetailsPayload;
  let jwtPayload;
  let nextResponse;

  //In reality would do a database lookup here.
  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Assign jwt token
    userDetailsPayload = {
      id: 0,
      firstName: "Chris",
      email: "foo@bar.com",
      role: "admin",
    };
    //token = jwt.sign(payload, "my-secret", { expiresIn: "1d" });
    token = jwt.sign(userDetailsPayload, "my-secret", { expiresIn: "1m" }); //returns the token
    jwtPayload = jwt.verify(token, "my-secret") as JwtPayload;

    console.log("token in login");
    console.log(token);
  }

  //set cookie
  if (token) {
    nextResponse = NextResponse.json(
      {
        ...userDetailsPayload,
        iat: jwtPayload!.iat,
        exp: jwtPayload!.exp,
        isLoggedIn: true,
      },
      { status: 200 }
    );
    nextResponse.cookies.set("jwt", token, {
      maxAge: 60 * 60 * 24, //To do: Reduce this number?
      httpOnly: true,
      sameSite: "strict",
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
