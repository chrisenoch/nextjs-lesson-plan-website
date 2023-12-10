import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: { username: string; password: string } = await request.json();
  let nextResponse = NextResponse.json(res);

  console.log("nextResponse below");
  console.log(nextResponse);

  console.log("username below");
  console.log(res.username);
  console.log("password below");
  console.log(res.password);

  //In reality would do a database lookup here.
  let token;
  if (res.username.toLowerCase() === "admin" && res.password === "admin") {
    //Assign jwt token
    const payload = {
      name: "Chris Enoch",
      age: "39",
    };
    token = jwt.sign(payload, "my-secret");
  }

  console.log("jwt below");
  console.log(token);

  //set cookie
  if (token) {
    console.log("token exists");
    // nextResponse.cookies.set({
    //   name: "jwt",
    //   value: token,
    //   maxAge: 60 * 60 * 24, //To do: Reduce this number.
    //   httpOnly: true,
    //   sameSite: "strict",
    // });

    //nextResponse.cookies.set([key:"foo", value"bar"]);
    nextResponse.cookies.set("jwt", token, {
      maxAge: 60 * 60 * 24, //To do: Reduce this number.
      httpOnly: true,
      sameSite: "strict",
    });
  }

  return nextResponse;
}
