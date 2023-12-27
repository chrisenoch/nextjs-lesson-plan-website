import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import {
  checkPermissions,
  joseVerifyToken,
} from "@/functions/auth/check-permissions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in jobs api");
  const searchParams = request.nextUrl.searchParams;

  //If no query string, the request is for all jobs. All users are granted GET access to all jobs
  if (searchParams.size < 1) {
    try {
      const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database. There would be a database look-up here.
      const jobs = await data.json();
      //Don't return the userId so users cannot see which jobs were added by which user.
      const jobsWithNoUserId = jobs.map((job) => {
        const { userId, ...jobWithNoUserId } = job;
        return jobWithNoUserId;
      });
      return NextResponse.json({ jobs: jobsWithNoUserId }, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch jobs." },
        { status: 500 }
      );
    }
  }

  const userIdFromQueryParam = request.nextUrl.searchParams.get("userId");
  if (userIdFromQueryParam) {
    const permissionStatusPromise = checkPermissions({
      request,
      accessTokenName: "jwt",
      accessTokenSecret: "my-secret",
      validUserRoles: ["USER"],
      superAdmins: [],
      callback,
    });
    const permissionStatus = await permissionStatusPromise;

    //To do: "make the response more fine-grained, depending on the error-type"
    if (permissionStatus !== "SUCCESS") {
      return NextResponse.json(
        { error: "Error fetching jobs." },
        { status: 401 }
      );
    }
    try {
      const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database. There would be a database look-up here.
      const jobs = await data.json();
      const jobsAddedByUser = jobs.filter(
        (job) => job.userId === userIdFromQueryParam
      );
      return NextResponse.json({ jobs: jobsAddedByUser }, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch jobs due to a network failure." },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    {
      error:
        "Unable to fetch jobs due to invalid query parameter(s). If you are trying to fetch all jobs, do not add any query parameters.",
    },
    { status: 401 }
  );
}

function callback(request: NextRequest, accessTokenPayload: jose.JWTPayload) {
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
