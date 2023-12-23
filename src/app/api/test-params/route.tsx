import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in test params");
  //let resp;
  const searchParams = request.nextUrl.searchParams;

  const foo = searchParams.get("foo");
  console.log("print bar: " + foo);

  //If no query string, the request is for all jobs. All users are granted GET access to all jobs

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
}
