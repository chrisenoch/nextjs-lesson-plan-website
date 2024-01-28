import { LessonPlan } from "@/models/types/LessonPlans/LessonPlan";

export function getBookmakedLessonPlanIds(
  lessonPlans: LessonPlan[],
  bookmarks: { userId: string; lessonPlanId: string }[]
) {
  const bookmarkedLessonPlanIds = new Set<string>();
  for (const lessonPlan of lessonPlans) {
    for (const bookmark of bookmarks) {
      if (bookmark.lessonPlanId === lessonPlan.id) {
        bookmarkedLessonPlanIds.add(lessonPlan.id);
        break;
      }
    }
  }
  return bookmarkedLessonPlanIds;
}
