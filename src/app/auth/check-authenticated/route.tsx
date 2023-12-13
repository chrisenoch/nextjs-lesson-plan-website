import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside check-authenticated get route handler");

  const token = request.cookies.get("jwt");
  console.log(token);

  let resp;
  if (token) {
    try {
      const payload = jwt.verify(token.value, "my-secret") as JwtPayload;
      payload.isLoggedIn = true;

      console.log("payload in check-authenticated below");
      console.log(payload);

      resp = NextResponse.json(payload);
    } catch {
      console.log("in catch");
      resp = NextResponse.json(
        { message: "Invalid jwt token.", isLoggedIn: false }, //To do: Change this error message
        { status: 401 }
      );
    }
  } else {
    resp = NextResponse.json(
      { message: "No jwt token cookie found.", isLoggedIn: false },
      { status: 200 }
    );
  }

  return resp;
}
