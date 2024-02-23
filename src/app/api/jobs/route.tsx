import { NextRequest, NextResponse } from "next/server";
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
    `${process.env.FIREBASE_DB_URL}/jobs.json`,
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

  const jobFields = {
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  };

  const { isFormValid } = isAddJobValid(jobFields);
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
    `${process.env.FIREBASE_DB_URL}/jobs.json`,
    `Added job ${jobTitle}`,
    "Failed to create job due to an error. Please contact our support team.",
    {
      userId,
      ...jobFields,
    }
  );

  if (payload.isError) {
    return NextResponse.json(payload, { status: 500 });
  }
  const job = {
    id: payload.id,
    userId,
    ...jobFields,
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

  const fetchJobPayload = await firebaseGETById(
    `${process.env.FIREBASE_DB_URL}/jobs/${id}.json`,
    "Successfully fetched job",
    "Unable to fetch job."
  );

  if (fetchJobPayload.isError) {
    return NextResponse.json(
      {
        message: "Unable to delete job.",
        isError: true,
      },
      { status: 500 }
    );
  }
  const jobToBeDeleted = fetchJobPayload.entry;
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
    `${process.env.FIREBASE_DB_URL}/jobs/${id}.json`,
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
