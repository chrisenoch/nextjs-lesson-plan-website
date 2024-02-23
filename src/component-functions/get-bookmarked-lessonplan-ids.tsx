import { LessonPlanCardSummary } from "@/models/types/LessonPlans/LessonPlanCardSummary";

export function getBookmakedLessonPlanIds(
  lessonPlans: LessonPlanCardSummary[],
  bookmarks: { userId: string; lessonPlanId: string }[]
) {
  const bookmarkedLessonPlanIds = new Set<string>();
  for (const lessonPlan of lessonPlans) {
    for (const bookmark of bookmarks) {
      console.log("bookmark.lessonPlanId and lessonPlan.id");
      console.log(bookmark.lessonPlanId);
      console.log(lessonPlan.id);
      if (bookmark.lessonPlanId === lessonPlan.id) {
        bookmarkedLessonPlanIds.add(lessonPlan.id);
        break;
      }
    }
  }
  return bookmarkedLessonPlanIds;
}
