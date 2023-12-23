import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in jobs api");
  //let resp;
  const searchParams = request.nextUrl.searchParams;
  //If no query string, the request is for all jobs. All users are granted GET access to all jobs
  if (searchParams.size < 1) {
    try {
      const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database. There would be a database look-up here.

      const jobs = await data.json();
      return NextResponse.json({ jobs }, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch jobs." },
        { status: 500 }
      );
    }
  } else {
    //check params. If userId exists, return jobs for that specific user.
    //If any otherr params exist, return error sayig must only include the necessary query params. Did you mean to set userId?
  }

  //   const accessToken = request.cookies.get("jwt");

  //   if (accessToken) {
  //     try {
  //       const { payload } = await jose.jwtVerify(
  //         accessToken.value,
  //         new TextEncoder().encode("my-secret")
  //       );

  //       //get user role

  //       resp = NextResponse.json({
  //         ...jwtAccessTokenPayload,
  //         isLoggedIn: true,
  //       });
  //     } catch {
  //       console.log("in catch jobs endpoint");
  //       resp = NextResponse.json({ message: "Access Denied." }, { status: 403 });
  //     }
  //   } else {
  //     resp = NextResponse.json(
  //       { message: "Missing jwt token." },
  //       { status: 401 }
  //     );
  //   }

  //   return resp;
}
