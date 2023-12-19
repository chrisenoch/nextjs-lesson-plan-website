import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("inside refresh test-links endpoint");

  const resp = NextResponse.redirect(new URL("/lessonplans", request.url));
  //resp.headers.set("foo", "bar");

  return resp;
}
