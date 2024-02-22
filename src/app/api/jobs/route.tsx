import { NextRequest, NextResponse } from "next/server";
import { checkPermissions } from "@/server-only/auth/check-permissions";
import { getAccessTokenInfo } from "@/server-only/auth/get-access-token-info";
import { isAddJobValid } from "@/validation/jobs/jobs-validators";
import { getUserIdOnSuccessOrErrorResponse } from "@/server-only/auth/get-userId-or-error-response";
import { AddedJob } from "@/models/types/Jobs/Jobs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in jobs get method");

  //All users are granted GET access to all jobs
  try {
    const response = await fetch("http://localhost:3001/jobs"); // Used in place of a database.
    const jobs = await response.json();
    return NextResponse.json(
      {
        message: `Successfully fetched jobs.`,
        isError: false,
        jobs,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Unable to fetch jobs.",
        isError: true,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("in jobs post method");

  const {
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  }: AddedJob = await request.json();

  //check user is logged in
  const { userId, errorResponse } = await getUserIdOnSuccessOrErrorResponse({
    request,
    failureMessage: "Error adding job.",
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });
  if (errorResponse) {
    return errorResponse;
  }

  const { isFormValid } = isAddJobValid({
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  });
  if (!isFormValid) {
    return NextResponse.json(
      {
        message:
          "Error adding job. The form input is not in the correct format.",
        isError: true,
      },
      { status: 400 }
    );
  }

  //add to "database"
  try {
    // Used in place of a database.
    const response = await fetch("http://localhost:3001/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        jobTitle,
        jobDescription,
        jobLocation,
        jobCompany,
        jobSalary,
      }),
    });
    const job = await response.json();

    return NextResponse.json(
      {
        message: `Added job ${jobTitle}`,
        isError: false,
        job,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to create job due to an error. Please contact our support team.",
        isError: true,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  console.log("in jobs delete method");

  const id = await request.json();
  let jobToBeDeleted;
  let jobData;
  try {
    jobData = await fetch(`http://localhost:3001/jobs/${id}`); // Used in place of a database.
    jobToBeDeleted = await jobData.json();
  } catch {
    return NextResponse.json(
      {
        message: "Unable to delete job.",
        isError: true,
      },
      { status: 500 }
    );
  }

  //get userId
  const accessTokenInfo = await getAccessTokenInfo({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  });

  if (
    !accessTokenInfo ||
    (accessTokenInfo.role !== "ADMIN" &&
      accessTokenInfo.id !== jobToBeDeleted.userId)
  ) {
    return NextResponse.json(
      {
        message:
          "Unable to delete job. You may only delete jobs that you added.",
        isError: true,
      },
      { status: 403 }
    );
  }

  //delete job from "database"
  try {
    //used in place of a database
    const response = await fetch(`http://localhost:3001/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(
      {
        message: `Job deleted`,
        isError: false,
        id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Failed to delete job due to an error. Please contact our support team.",
        isError: true,
      },
      { status: 500 }
    );
  }
}
