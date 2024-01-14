import { fetchCollection } from "@/server-only/route-functions";

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
