import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import {
  checkPermissions,
  joseVerifyToken,
} from "@/functions/auth/check-permissions";
import { revalidatePath } from "next/cache";
import { getAccessTokenInfo } from "@/functions/auth/get-access-token-info";
import { z } from "zod";
import {
  jobDescriptionValidator,
  jobTitleValidator,
} from "@/app/validation/jobs/jobs-validators";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in jobs get method");

  //All users are granted GET access to all jobs
  try {
    const data = await fetch("http://localhost:3001/jobs"); // This is used in place of a database.
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

  //check user is logged in
  const permissionStatusPromise = checkPermissions({
    request,
    accessTokenName: "jwt",
    accessTokenSecret: "my-secret",
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });
  const permissionStatus = await permissionStatusPromise;
  if (permissionStatus !== "SUCCESS") {
    return NextResponse.json({
      message: "Error adding job.",
      isError: true,
      status: 401,
    });
  }

  //get userId
  const accessTokenInfoPromise = getAccessTokenInfo({
    request,
    accessTokenName: "jwt",
    accessTokenSecret: "my-secret",
  });
  const accessTokenInfo = await accessTokenInfoPromise;
  if (!accessTokenInfo) {
    return NextResponse.json({
      message: "Error adding job.",
      isError: true,
      status: 401,
    });
  }
  const userId = accessTokenInfo.id;

  //validate user input
  const schema = z.object({
    jobTitle: jobTitleValidator,
    jobDescription: jobDescriptionValidator,
  });
  const jobTitle = postedData.jobTitle;
  const jobDescription = postedData.jobDescription;
  const parse = schema.safeParse({
    jobTitle,
    jobDescription,
  });
  if (!parse.success) {
    return NextResponse.json({
      message: "Error adding job. The form input is not in the correct format.",
      isError: true,
      status: 400,
    });
  }

  //add to "database"
  try {
    // This is used in place of a database.
    const response = await fetch("http://localhost:3001/jobs", {
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
      status: 200,
    });
  } catch {
    console.log("in catch in jobs route");
    revalidatePath("./");
    return NextResponse.json({
      message:
        "Failed to create job due to an error. Please contact our support team.",
      isError: true,
      status: 500,
    });
  }
}
