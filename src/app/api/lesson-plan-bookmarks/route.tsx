import { getLessonPlanBookmarks } from "@/db-fake";
import { getUserIdOnSuccessOrErrorResponse } from "@/server-only/auth/get-userId-or-error-response";
import { fetchCollection } from "@/server-only/route-functions";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log("in lessonPlanBookmarks get method");

  // const fetchedBookMarks = await getLessonPlanBookmarks();
  // const fetchBookmarksResponse = NextResponse.json(
  //   {
  //     message: "Successfully fetched lesson plan bookmarks",
  //     isError: false,
  //     bookmarks: fetchedBookMarks,
  //   },
  //   { status: 200 }
  // );

  // const test = await fetchCollection(
  //   "https://nextjs-lesson-plans-default-rtdb.europe-west1.firebasedatabase.app/lesson-plan-bookmarks.json",
  //   "Successfully fetched lesson plan bookmarks",
  //   "Unable to fetch lesson plan bookmarks.",
  //   "bookmarks"
  // );
  // const test1 = await test.json();
  // console.log("test1 in bookmarks");
  // console.log(test1);

  const fetchBookmarksResponse = await fetchCollection(
    "http://localhost:3001/lesson-plan-bookmarks",
    "Successfully fetched lesson plan bookmarks",
    "Unable to fetch lesson plan bookmarks.",
    "bookmarks"
  );

  const fetchBookmarksPayload = await fetchBookmarksResponse.json();

  const { userId, errorResponse } = await getUserIdOnSuccessOrErrorResponse({
    request,
    failureMessage: "Error saving lesson plan.",
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });

  if (errorResponse) {
    return errorResponse;
  }

  const { bookmarks: allBookmarks } = fetchBookmarksPayload as {
    message: string;
    isError: boolean;
    bookmarks: {
      id: string;
      userId: string;
      lessonPlanId: string;
    }[];
  };

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
  let fetchBookmarksResponse;
  let fetchBookmarksPayload;
  try {
    fetchBookmarksResponse = await fetchCollection(
      "http://localhost:3001/lesson-plan-bookmarks",
      "Successfully fetched lesson plan bookmarks",
      "Unable to fetch lesson plan bookmarks.",
      "bookmarks"
    );
    fetchBookmarksPayload = await fetchBookmarksResponse.json();
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to save/unsave lesson plan due to an error. Please contact our support team.",
        isError: true,
      },
      { status: 500 }
    );
  }

  const { bookmarks: allBookmarks } = fetchBookmarksPayload as {
    message: string;
    isError: boolean;
    bookmarks: {
      id: string;
      userId: string;
      lessonPlanId: string;
    }[];
  };

  const userBookmarks = allBookmarks.filter(
    (bookmark) => bookmark.userId === userId
  );

  const existingBookmark = userBookmarks.find(
    (bookmark) => bookmark.lessonPlanId === lessonPlanId
  );

  //If the bookmark was not found, then it was not bookmarked in the first place. So we need to add the new bookmark.
  if (existingBookmark === undefined) {
    try {
      const addBookmarkResponse = await fetch(
        "http://localhost:3001/lesson-plan-bookmarks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            lessonPlanId,
          }),
        }
      );
      const newBookmark = await addBookmarkResponse.json();
      const newBookmarks = [...userBookmarks, newBookmark];

      return NextResponse.json(
        {
          message: "Lesson plan saved",
          isError: false,
          bookmarks: newBookmarks,
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        {
          message:
            "Failed to save lesson plan due to an error. Please contact our support team.",
          isError: true,
        },
        { status: 500 }
      );
    }
  }

  //If get to here, we need to delete the bookmark from the json-server database.
  try {
    const response = await fetch(
      `http://localhost:3001/lesson-plan-bookmarks/${existingBookmark.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newBookmarks = userBookmarks.filter(
      (bookmark) => bookmark.lessonPlanId !== lessonPlanId
    );

    return NextResponse.json(
      {
        message: "Lesson plan deleted",
        isError: false,
        bookmarks: newBookmarks,
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
