import { getLessonPlanBookmarks } from "@/db-fake";
import { getUserIdOnSuccessOrErrorResponse } from "@/server-only/auth/get-userId-or-error-response";
import {
  firebaseGETCollection,
  firebaseDELETE,
  firebasePOST,
} from "@/server-only/route-functions";
import { NextRequest, NextResponse } from "next/server";
import { LessonPlanBoomark } from "@/models/types/LessonPlans/LessonPlanBookmark";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in lessonPlanBookmarks get method");

  const { userId, errorResponse } = await getUserIdOnSuccessOrErrorResponse({
    request,
    failureMessage: "Error saving lesson plan.",
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });

  if (errorResponse) {
    return errorResponse;
  }

  const fetchBookmarksPayload = await firebaseGETCollection(
    "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks.json",
    "Successfully fetched lesson plan bookmarks.",
    "Unable to fetch lesson plan bookmarks."
  );

  if (fetchBookmarksPayload.isError) {
    return NextResponse.json(fetchBookmarksPayload, { status: 500 });
  }

  const {
    data: allBookmarks,
  }: {
    data: LessonPlanBoomark[];
  } = fetchBookmarksPayload;

  //only return the bookmarks for the current logged-in user
  const userBookmarks = allBookmarks.filter(
    (bookmark) => bookmark.userId === userId
  );

  return NextResponse.json(
    {
      message: "Successfully fetched lesson plan bookmarks.",
      isError: false,
      bookmarks: userBookmarks,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  console.log("in lesson-plan-bookmarks post method");

  const lessonPlanId = await request.json();
  //check user is logged in
  const { userId, errorResponse } = await getUserIdOnSuccessOrErrorResponse({
    request,
    failureMessage: "Error saving lesson plan.",
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });

  if (errorResponse) {
    return errorResponse;
  }

  //Get bookmarks: If bookmark is present, delete bookmark. If bookmark is not present, add it.
  const fetchBookmarksPayload = await firebaseGETCollection(
    "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks.json",
    "Successfully fetched lesson plan bookmarks.",
    "Unable to fetch lesson plan bookmarks."
  );

  if (fetchBookmarksPayload.isError) {
    return NextResponse.json(fetchBookmarksPayload, { status: 500 });
  }

  const {
    data: allBookmarks,
  }: {
    data: LessonPlanBoomark[];
  } = fetchBookmarksPayload;

  const userBookmarks = allBookmarks.filter(
    (bookmark) => bookmark.userId === userId
  );
  const existingBookmark = userBookmarks.find(
    (bookmark) => bookmark.lessonPlanId === lessonPlanId
  );

  //If the bookmark was not found, then it was not bookmarked in the first place. So we need to add the new bookmark.
  if (existingBookmark === undefined) {
    const payload = await firebasePOST(
      "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks.json",
      "Successfully added lesson plan bookmark.",
      "Failed to save lesson plan due to an error. Please contact our support team.",
      {
        userId,
        lessonPlanId,
      }
    );

    if (payload.isError) {
      return NextResponse.json(payload, { status: 500 });
    }

    const newBookmarks = [
      ...userBookmarks,
      {
        id: payload.data,
        userId,
        lessonPlanId,
      },
    ];

    return NextResponse.json(
      {
        message: "Lesson plan saved",
        isError: false,
        bookmarks: newBookmarks,
      },
      { status: 200 }
    );
  }

  //If get to here, we need to delete the bookmark
  const payload = await firebaseDELETE(
    `https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks/${existingBookmark.id}.json`,
    "Lesson plan deleted.",
    "Failed to delete lesson plan due to an error. Please contact our support team."
  );

  if (payload.isError) {
    return NextResponse.json(payload, { status: 500 });
  }

  const newBookmarks = userBookmarks.filter(
    (bookmark) => bookmark.lessonPlanId !== lessonPlanId
  );

  return NextResponse.json(
    {
      message: "Lesson plan deleted.",
      isError: false,
      bookmarks: newBookmarks,
    },
    { status: 200 }
  );
}
