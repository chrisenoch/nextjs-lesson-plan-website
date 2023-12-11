import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { username: string; password: string } = await request.json();
  let nextResponse = NextResponse.json(res);

  //In reality would do a database lookup here.
  let token;
  if (res.username.toLowerCase() === "admin" && res.password === "admin") {
    //Assign jwt token
    const payload = {
      name: "Chris Enoch",
      age: "39",
      role: "admin",
    };
    token = jwt.sign(payload, "my-secret");
  }

  //set cookie
  if (token) {
    console.log("token exists");
    nextResponse.cookies.set("jwt", token, {
      maxAge: 60 * 60 * 24, //To do: Reduce this number.
      httpOnly: true,
      sameSite: "strict",
    });
    return nextResponse.ok;
  } else {
    return NextResponse.json({ error: "Unsuccessful login" }, { status: 401 });
  }
}
