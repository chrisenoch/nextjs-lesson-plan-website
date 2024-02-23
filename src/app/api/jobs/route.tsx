import { NextRequest, NextResponse } from "next/server";
import { checkPermissions } from "@/server-only/auth/check-permissions";
import { getAccessTokenInfo } from "@/server-only/auth/get-access-token-info";
import { isAddJobValid } from "@/validation/jobs/jobs-validators";
import { getUserIdOnSuccessOrErrorResponse } from "@/server-only/auth/get-userId-or-error-response";
import { AddedJob } from "@/models/types/Jobs/Jobs";
import {
  firebaseDELETE,
  firebaseGETById,
  firebaseGETCollection,
  firebasePOST,
} from "@/server-only/route-functions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  console.log("in jobs get method");

  const fetchJobsPayload = await firebaseGETCollection(
    "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/jobs.json",
    "Successfully fetched jobs.",
    "Unable to fetch jobs."
  );

  if (fetchJobsPayload.isError) {
    return NextResponse.json(fetchJobsPayload, { status: 500 });
  }
  return NextResponse.json(fetchJobsPayload, { status: 200 });
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
  const payload = await firebasePOST(
    "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/jobs.json",
    `Added job ${jobTitle}`,
    "Failed to create job due to an error. Please contact our support team.",
    {
      userId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobCompany,
      jobSalary,
    }
  );

  if (payload.isError) {
    return NextResponse.json(payload, { status: 500 });
  }
  const job = {
    id: payload.data,
    userId,
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  };
  return NextResponse.json(
    {
      message: `Added job ${jobTitle}`,
      isError: false,
      job,
    },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  console.log("in jobs delete method");
  const id = await request.json();

  const fetchJobsPayload = await firebaseGETById(
    `https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/jobs/${id}.json`,
    "Successfully fetched job",
    "Unable to fetch job."
  );

  if (fetchJobsPayload.isError) {
    return NextResponse.json(
      {
        message: "Unable to delete job.",
        isError: true,
      },
      { status: 500 }
    );
  }
  const jobToBeDeleted = fetchJobsPayload.data;
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
  const deleteJobPayload = await firebaseDELETE(
    `https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks/${id}.json`,
    "Lesson plan deleted.",
    "Failed to delete lesson plan due to an error. Please contact our support team."
  );
  if (deleteJobPayload.isError) {
    return NextResponse.json(deleteJobPayload, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Job deleted`,
      isError: false,
      id,
    },
    { status: 200 }
  );
}
