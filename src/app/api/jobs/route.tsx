import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { joseVerifyToken } from "@/functions/auth/check-permissions";

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
      return NextResponse.json({ jobs }, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch jobs." },
        { status: 500 }
      );
    }
  } else {
    const userIdFromQueryParam = searchParams.get("userId");
    //check params. If userId exists, return jobs for that specific user.
    if (userIdFromQueryParam) {
      const accessToken = request.cookies.get("jwt");
      let userIdFromAccessToken: string;
      if (accessToken) {
        try {
          const { payload } = await joseVerifyToken(
            accessToken.value,
            "my-secret"
          );
          userIdFromAccessToken = payload.id as string;

          if (payload.role === "ADMIN") {
            const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database. There would be a database look-up here.
            const jobs = (await data.json()) as any[];
            const userSpecificJobs = jobs.filter(
              (job) => job.userId === userIdFromAccessToken
            );
            return NextResponse.json(
              { usersJobs: userSpecificJobs },
              { status: 200 }
            );
          }

          if (userIdFromAccessToken === userIdFromQueryParam) {
            const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database. There would be a database look-up here.
            const jobs = await data.json();
            const userSpecificJobs = jobs.filter(
              (job) => job.userId === userIdFromAccessToken
            );
            return NextResponse.json({ userSpecificJobs }, { status: 200 });
          } else {
            return NextResponse.json(
              {
                error: "Access denied. You may only view jobs that you added.",
              },
              { status: 403 }
            );
          }
        } catch {
          //token verification failed
          return NextResponse.json(
            {
              error:
                "Unable to fetch jobs. You must be logged in to view any jobs you added.",
            },
            { status: 401 }
          );
        }
      } else {
        //no access token
        return NextResponse.json(
          {
            error:
              "Unable to fetch jobs. You must be logged in to view any jobs you added.",
          },
          { status: 401 }
        );
      }
    } else {
      //no userId query parameter
      return NextResponse.json(
        {
          error:
            "Unable to fetch jobs due to invalid query parameter(s). If you are trying to fetch all jobs, do not add any query parameters.",
        },
        { status: 401 }
      );
    }

    //To do? If any other params exist, return error saying must only include the necessary query params. Did you mean to set userId?
  }
}
