import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { email: string; password: string } = await request.json();
  let token;
  let payload;
  let nextResponse;
  //In reality would do a database lookup here.

  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Assign jwt token
    payload = {
      id: 0,
      firstName: "Chris",
      email: "foo@bar.com",
      role: "admin",
    };
    token = jwt.sign(payload, "my-secret", { expiresIn: "1d" });
  }

  //set cookie
  if (token) {
    nextResponse = NextResponse.json(
      { ...payload, isLoggedIn: true },
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
