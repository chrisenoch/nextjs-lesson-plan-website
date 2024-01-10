import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  console.log("in lesson plans get method");

  //All users are granted GET access to all lesson plans
  try {
    const response = await fetch("http://localhost:3001/lesson-plans"); // Used in place of a database.
    const lessonPlans = await response.json();
    return NextResponse.json(
      {
        message: `Successfully fetched lesson plans.`,
        isError: false,
        lessonPlans,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Unable to fetch lesson plans.",
        isError: true,
      },
      { status: 500 }
    );
  }
}
