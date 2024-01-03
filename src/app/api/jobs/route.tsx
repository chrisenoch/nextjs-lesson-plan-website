import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import {
  checkPermissions,
  joseVerifyToken,
} from "@/functions/auth/check-permissions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in jobs get method");

  //All users are granted GET access to all jobs
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

export async function POST(request: NextRequest) {
  console.log("in jobs post method");

  const postedData: { jobTitle: string; jobDescription: string } =
    await request.json();

  console.log("data in jobs route");
  console.log(postedData);

  //get jobTitle and jobDescription

  // const permissionStatusPromise = checkPermissions({
  //   request,
  //   accessTokenName: "jwt",
  //   accessTokenSecret: "my-secret",
  //   validUserRoles: ["USER"],
  //   superAdmins: [],
  // });
  // const permissionStatus = await permissionStatusPromise;

  const permissionStatus = "SUCCESS"; //To do: Remove. Just for testing.
  const userId = "1"; //To do: Get userId from token - Just for testing.
  if (permissionStatus !== "SUCCESS") {
    return NextResponse.json({ error: "Error deleting job." }, { status: 401 });
  }

  try {
    const response = await fetch("http://localhost:3001/jobs", {
      // This is used in place of a database. There would be a database look-up here.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        jobTitle: postedData.jobTitle,
        jobDescription: postedData.jobDescription,
      }),
    });

    const job = await response.json();

    revalidatePath("./");
    return NextResponse.json({
      message: `Added job ${postedData.jobTitle}`,
      isError: false,
      job,
    });
  } catch {
    console.log("in catch in jobs route");
    revalidatePath("./");
    return NextResponse.json({
      message:
        "Failed to create job due to an error. Please contact our support team.",
      isError: true,
    });
  }
}

function GETCallback(
  request: NextRequest,
  accessTokenPayload: jose.JWTPayload
) {
  let permissionStatus;
  if (
    request.nextUrl.searchParams.get("userId") === null ||
    request.nextUrl.searchParams.get("userId") === undefined
  ) {
    permissionStatus = "INVALID_QUERY_PARAMETER(S)";
  } else if (
    accessTokenPayload.id === request.nextUrl.searchParams.get("userId")
  ) {
    permissionStatus = "SUCCESS";
  } else {
    permissionStatus = "ACCESS_DENIED_INVALID_USER_ID";
  }
  return permissionStatus;
}