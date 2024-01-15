import { checkPermissions } from "@/functions/auth/check-permissions";
import { getAccessTokenInfo } from "@/functions/auth/get-access-token-info";
import { fetchCollection } from "@/server-only/route-functions";
import { isAddJobValid } from "@/validation/jobs/jobs-validators";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET() {
  console.log("in lessonPlanBookmarks get method");

  const response = await fetchCollection(
    "http://localhost:3001/lesson-plan-bookmarks",
    "Successfully fetched lesson plan bookmarks",
    "Unable to fetch lesson plan bookmarks.",
    "bookmarks"
  );

  return response;
}

export async function POST(request: NextRequest) {
  console.log("in lesson-plan-bookmarks post method");

  const lessonPlanId = await request.json();

  //check user is logged in
  const permissionStatus = await checkPermissions({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    validUserRoles: ["USER"],
    superAdmins: ["ADMIN"],
  });

  if (permissionStatus !== "SUCCESS") {
    return NextResponse.json(
      {
        message: "Error saving lesson plan.",
        isError: true,
      },
      { status: 401 }
    );
  }

  //get userId
  const accessTokenInfo = await getAccessTokenInfo({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  });
  if (!accessTokenInfo) {
    return NextResponse.json(
      {
        message: "Error saving lesson plan.",
        isError: true,
      },
      { status: 401 }
    );
  }
  const userId = accessTokenInfo.id;

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

  const { bookmarks } = fetchBookmarksPayload as {
    message: string;
    isError: boolean;
    bookmarks: {
      id: string;
      userId: string;
      lessonPlanId: string;
    }[];
  };

  const existingBookmark = bookmarks.find(
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
      const newBookmarks = [...bookmarks, newBookmark];

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
    const newBookmarks = bookmarks.filter(
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
