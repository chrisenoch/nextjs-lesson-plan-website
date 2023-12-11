import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside user details get route handler");

  const token = request.cookies.get("jwt");
  console.log(token);

  //let payload: { id: string; firstName: string; email: string; role: string };
  let payload;

  let resp;
  if (token) {
    payload = jwt.verify(token.value, "my-secret");

    console.log("token below");
    console.log("payload below");
    console.log(payload);

    resp = NextResponse.json({ token: token.value, payload: payload });
  } else {
    resp = NextResponse.json(
      { message: "No jwt token cookie found." },
      { status: 400 }
    );
  }

  return resp;
}
