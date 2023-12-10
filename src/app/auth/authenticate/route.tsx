import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  console.log("in authenticate");

  const token = request.cookies.get("jwt");
  console.log(token);

  let payload;

  let resp;
  if (token) {
    payload = jwt.verify(token.value, "my-secret");

    console.log("token below");
    console.log(token);
    console.log("payload below");
    console.log(payload);

    resp = NextResponse.json({ token: token.value, payload: payload });
  } else {
    resp = NextResponse.json({ message: "No jwt cookie found" });
  }

  return resp;
}
