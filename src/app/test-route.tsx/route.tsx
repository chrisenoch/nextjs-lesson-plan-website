import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// To do
// CSRF protection with double-submit cookie method.
// Query database to check if refresh token has been revoked.
// Cors
// Content Security Policy
// Add a separate authentication server?
// secure flag to cookies
// Research other threats.

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in test route");
  return NextResponse.redirect(new URL("/lessonplans", request.url));
}
