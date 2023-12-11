import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { email: string; password: string } = await request.json();

  //In reality would do a database lookup here.
  let token;
  if (res.email.toLowerCase() === "admin" && res.password === "admin") {
    //Assign jwt token
    const payload = {
      id: 0,
      firstName: "Chris",
      email: "foo@bar.com",
      role: "admin",
    };
    //token = jwt.sign(payload, "my-secret", { expiresIn: "1d" });
    token = jwt.sign(payload, "my-secret", { expiresIn: "5s" });
  }

  //set cookie
  let nextResponse;
  if (token) {
    nextResponse = NextResponse.json(
      { message: "Login successful" },
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
      { error: "Unsuccessful login" },
      { status: 401 }
    );
    return nextResponse;
  }
}
